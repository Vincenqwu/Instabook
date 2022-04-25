const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// get a single comment
router.get("/:username", async (req, res) => {
    try {
        console.log("search user");
        const { username } = req.params;
        console.log(username);

        const users = await prisma.user.findMany({
            where: {
                username: {
                    startsWith: username,
                }
            }
        });
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;