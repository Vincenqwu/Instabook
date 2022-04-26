const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// get a user's information
router.get("/:username", async (req, res) => {
    console.log("/user/username")
    try {
        const { username } = req.params;
        console.log(username);
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get a user's information
router.get("/id/:id", async (req, res) => {
    console.log("/user/id")
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                auth0Id: id,
            },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// follow a user
router.put("/:username/follow", async (req, res) => {
    try {
        console.log("follow");
        const { username } = req.params;
        const auth0Id = req.oidc.user.sub;

        console.log(username);

        const targetUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        const fromUser = await prisma.user.findUnique({
            where: {
                auth0Id: auth0Id
            }
        })

        if(!fromUser.following.includes(targetUser.auth0Id)) {
            fromUser.following.push(targetUser.auth0Id);
        }

        if(!targetUser.follower.includes(fromUser.auth0Id)) {
            targetUser.follower.push(fromUser.auth0Id);
        }

        const newTargetUser = await prisma.user.update({
            where: {
                auth0Id: targetUser.auth0Id
            },
            data: {
                follower: targetUser.follower
            }
        });

        const newFromUser = await prisma.user.update({
            where: {
                auth0Id: fromUser.auth0Id
            },
            data: {
                following: fromUser.following
            } 
        });
        res.status(200).json(newFromUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// unfollow a user
router.put("/:username/unfollow", async (req, res) => {
    try {
        console.log("unfollow");
        const { username } = req.params;
        const auth0Id = req.oidc.user.sub;

        console.log(username);

        const targetUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        const fromUser = await prisma.user.findUnique({
            where: {
                auth0Id: auth0Id
            }
        })

        if(fromUser.following.includes(targetUser.auth0Id)) {
            fromUser.following = fromUser.following.filter(e => e != targetUser.auth0Id);
        }

        if(targetUser.follower.includes(fromUser.auth0Id)) {
            targetUser.follower = targetUser.follower.filter(e => e != fromUser.auth0Id);
        }

        const newTargetUser = await prisma.user.update({
            where: {
                auth0Id: targetUser.auth0Id
            },
            data: {
                follower: targetUser.follower
            }
        });

        const newFromUser = await prisma.user.update({
            where: {
                auth0Id: fromUser.auth0Id
            },
            data: {
                following: fromUser.following
            } 
        });
        res.status(200).json(newFromUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;