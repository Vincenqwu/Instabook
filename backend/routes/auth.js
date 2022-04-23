const router = require("express").Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  routes: {
    login: false,
  }
};

router.use(auth(config));

// test if user is logged in or not
router.get('/', (req, res) => {
  console.log("default page");
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

router.get('/login', (req, res) => res.oidc.login({ returnTo: 'http://localhost:3000/home' }));

// verify if the user is registered in auth0 and server db
router.get("/verify", requiresAuth(), async (req, res) => {

  const auth0Id = req.oidc.user.sub;
  const email = req.oidc.user.name;
  const nickname = req.oidc.user.nickname;
  const picture = req.oidc.user.picture;

  const user = await prisma.user.findUnique({
    where: {
      auth0Id: auth0Id
    }
  });

  if (user) {
    res.status(200).json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        auth0Id: auth0Id,
        email: email,
        username: nickname,
        picture: picture,
        location: null,
      }
    })
    res.status(200).json(newUser);
  }
})

// router.post('/callback', (req, res) => {
//     console.log("callback");
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
//     res.send("Hello");
// })

module.exports = router;