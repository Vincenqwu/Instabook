const router = require("express").Router();
const {PrismaClient, Gender} = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');
const { check, body, validationResult } = require('express-validator');

// get account information
router.get("/", async (req, res) => {
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
router.put("/", requiresAuth(), 
    body("firstName").isLength({max: 20}),
    body("lastName").isLength({max: 20}),
    body("gender").matches(/^(MALE|FEMALE)$/), async (req, res) => {
    // const userProfile = await prisma.user
    console.log("PUT /profile");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {firstName, lastName, gender} = req.body;
        const auth0Id = req.oidc.user.sub;
        const user = await prisma.user.update({
            where: {
                auth0Id: auth0Id
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
            },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// update user location
router.put("/location", requiresAuth(), 
    body("location").isFloat({min: -180, max: 180}), async (req, res) => {
    // const userProfile = await prisma.user
    console.log("PUT /profile/location");
    try {
        const {location} = req.body;
        const auth0Id = req.oidc.user.sub;
        const user = await prisma.user.update({
            where: {
                auth0Id: auth0Id
            },
            data: {
                location: location,
            },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;