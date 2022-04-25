const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// upload an image to server
router.post("/", async (req, res) => {
    try {
        console.log("uploading");
        res.status(200).json("uploaded");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;