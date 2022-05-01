const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// get a single comment
router.get("/:id", async (req, res) => {
    try {
        console.log("get comment");
        const { id } = req.params;
        console.log(id);
        const comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        });
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