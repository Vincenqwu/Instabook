const router = require("express").Router();
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, req.body.name);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (req.body.name.match(/\.(png|jpg|jpeg)$/) === null) { 
           return cb(new Error('Please upload a Image'))
        }
        cb(null, true);
    }
});

// upload an image to server
router.post("/", upload.single("file"), async (req, res) => {
    try {
        console.log("uploading");
        res.status(200).json("uploaded");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;