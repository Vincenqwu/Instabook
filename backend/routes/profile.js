const router = require("express").Router();
const {PrismaClient, Gender} = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// get account information
router.get("/", requiresAuth(), async (req, res) => {
    console.log("/profile");
    console.log(req);
    try {
        const auth0Id = req.oidc.user.sub;
        const user = await prisma.user.findUnique({
            where: {
                auth0Id: auth0Id
            }
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// modify account information
router.put("/", async (req, res) => {
    // const userProfile = await prisma.user
    console.log("PUT /profile");
    try {
        const {picture, firstName, lastName, gender, location} = req.body;
        console.log(picture, firstName, lastName, gender, location);
        const auth0Id = req.oidc.user.sub;
        console.log(auth0Id);
        const user = await prisma.user.update({
            where: {
                auth0Id: auth0Id
            },
            data: {
                picture: picture,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                location: location,
            },
        });
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;