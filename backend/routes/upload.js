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
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
           return cb(new Error('Please upload a Image'))
         }
        cb(undefined, true);
    }
});

const upload = multer({storage: storage});

// upload an image to server
router.post("/", upload.single("file"), async (req, res) => {
    try {
        console.log("uploading");
        console.log(req.body);
        res.status(200).json("uploaded");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;