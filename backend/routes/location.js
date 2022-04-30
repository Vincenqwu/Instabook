const router = require("express").Router();
const {PrismaClient, Gender} = require("@prisma/client")
const prisma = new PrismaClient();
const { requiresAuth } = require('express-openid-connect');

// update user location
router.put("/update", async (req, res) => {
    // const userProfile = await prisma.user
    console.log("PUT /location/update");
    try {
        const {location} = req.body;
        console.log(location);
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

// get a user's nearby users
router.get("/nearby", requiresAuth(), async (req, res) => {
    try {
        console.log("/nearby");
        const auth0Id = req.oidc.user.sub;
        console.log(auth0Id);
        const user = await prisma.user.findUnique({
            where: {
                auth0Id: auth0Id,
            },
        });
        if(user.location === null) {
            throw "cannot determine user's location"
        }
        
        console.log("getting users");
        const users = await prisma.user.findMany({
            where: {
                location: {
                    is: {
                        latitude: {
                            gt: user.location.latitude - 1,
                            lt: user.location.latitude + 1 
                        },
                        longitude: {
                            gt: user.location.longitude - 1,
                            lt: user.location.longitude + 1 
                        }
                    }
                }
            }
        })
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;