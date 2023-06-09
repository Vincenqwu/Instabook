const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');
const { body, validationResult } = require('express-validator');

// Get post feed
router.get("/feed", async (req, res) => {
    console.log("/feed")
    try {
        // not logged in
        if (req.oidc.user === undefined) {
            // TODO
            // get latest posts
            const posts = await prisma.post.findMany({
                select: {
                    id: true,
                }
            }).then( data => data.map(e => e.id));
            res.status(200).json(posts)
        }
        // logged in
        else {
            // TODO
            // get posts from followed users
            const posts = await prisma.post.findMany({
                select: {
                    id: true,
                }
            }).then( data => data.map(e => e.id));
            res.status(200).json(posts)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// Create a new post
router.post("/create", requiresAuth(),
    body('content').notEmpty().isLength({max: 500}), async (req, res) => {
    try {
        console.log("create");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
        return res.status(400).json({ errors: errors.array() });
        }
        const auth0Id = req.oidc.user.sub;
        const content = req.body.content;
        const image = req.body.image;

        const data = {
            content: content,
            authorId: auth0Id,
        }
        if (image) {
            data["image"] = `${process.env.SERVER_URL}/${process.env.PUBLIC_PATH}/${image}`;
            console.log(data.image);
        }
        const newPost = await prisma.post.create({
            data: data
        });

        const user = await prisma.user.update({
            where: {
                auth0Id: auth0Id
            },
            data: {
                posts: {
                    push: newPost.id
                }
            }
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get a post
router.get("/:id", async (req, res) => {
    try {
        console.log("get post");
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        // add user info to post json
        post["author"] = await prisma.user.findUnique({
            where: {
                auth0Id: post.authorId,
            },
            select: {
                auth0Id: true,
                email: true,
                username: true,
                picture: true,
            }
        })
        // add all comments to post json
        post.comments = await Promise.all(post.comments.map( async (c) => {
            return await prisma.comment.findUnique({
                where: {
                    id: c
                }
            });
        }));

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get multiple posts by a list of ids
router.post("/", async (req, res) => {
    try {
        console.log("get multiple post");
        const ids = req.body.ids;

        posts = []
        for (let i = 0; i < ids.length; i++) {
            let id = ids[i];
            let post = await prisma.post.findUnique({
                where: {
                    id: id
                }
            })
            console.log(post.authorId);
            let user = await prisma.user.findUnique({
                where: {
                    auth0Id: post.authorId
                }
            })
            post["author"] = user;
            posts.push(post);
        }
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// delete a post
router.delete("/:id", requiresAuth(), async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
        });

        console.log(post);

        // delete all its comments first
        await Promise.all(post.comments.map(async (c) => {
            try {
                await prisma.comment.delete({
                    where: {
                        id: c
                    }
                })
            } catch (err) {
                throw err;
            }
        }))


        const posts = await prisma.user.findUnique({
            where: {
                auth0Id: post.authorId
            },
            select: {
                posts: true
            }
        }).then(data => data.posts.filter( e => e !== id));

        const user = await prisma.user.update({
            where: {
                auth0Id: post.authorId,
            },
            data: {
                posts: posts
            }
        });

        await prisma.post.delete({
            where: {
                id: id
            }
        });

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// like a post
router.put("/:id/like", requiresAuth(), async (req, res) => {
    try {
        const { id } = req.params;
        const auth0Id = req.oidc.user.sub;

        const likedBy = await prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                likedBy: true
            }
        }).then(data => data.likedBy);

        console.log(likedBy);
        if(!likedBy.includes(auth0Id)) {
            likedBy.push(auth0Id);
        }

        const post = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                likedBy: likedBy
            }
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// unlike a post
router.put("/:id/unlike", requiresAuth(), async (req, res) => {
    try {
        const { id } = req.params;
        const auth0Id = req.oidc.user.sub;

        let likedBy = await prisma.post.findUnique({
            where: {
                id: id,
            },
            select: {
                likedBy: true
            }
        }).then(data => data.likedBy);

        console.log(likedBy);
        likedBy = likedBy.filter(e => e !== auth0Id);

        const post = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                likedBy: likedBy
            }
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get all post ids from a user
router.get("/from/:username", async (req, res) => {
    try {
        console.log("from user");
        const { username } = req.params;

        const posts = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                posts: true
            }
        }).then(data => data.posts);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// create a comment for post
router.post("/:id/comment",
    body('content').notEmpty().isLength({max: 200}), requiresAuth(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        console.log("commenting");
        const { id } = req.params;
        const auth0Id = req.oidc.user.sub;
        const { content } = req.body;

        const comment = await prisma.comment.create({
            data: {
                content: content,
                authorId: auth0Id
            }
        });

        const comments = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                comments: true
            }
        }).then(data => data.comments);

        comments.push(comment.id);

        const post = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                comments: comments,
            }
        })

        comment["author"] = await prisma.user.findUnique({
            where: {
                auth0Id: comment.authorId,
            },
            select: {
                auth0Id: true,
                email: true,
                username: true,
                picture: true,
            }
        })
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})



module.exports = router;