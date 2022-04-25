const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

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
router.post("/create", async (req, res) => {
    try {
        console.log("create");
        const auth0Id = req.oidc.user.sub;
        const content = req.body.content;
        const newPost = await prisma.post.create({
            data: {
                content: content,
                authorId: auth0Id,
            }
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
        console.log(id);
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
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
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// delete a post
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
        });

        console.log(post);

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

        let _ = await prisma.post.delete({
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
router.put("/:id/like", async (req, res) => {
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
router.put("/:id/unlike", async (req, res) => {
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
router.post("/:id/comment", async (req, res) => {
    try {
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

        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})



module.exports = router;