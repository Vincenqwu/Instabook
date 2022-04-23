const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const fs = require("fs")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();
const { auth, requiresAuth } = require('express-openid-connect');

const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");
const commentRoute = require("./routes/comment");

app.use(express.json());
app.use(cors());

app.use("/", authRoute);
app.use("/post/", postRoute);
app.use("/user/", userRoute);
app.use("/profile/", profileRoute);
app.use("/comment/", commentRoute);

app.get("/test", async (req, res) => {
    console.log("test");
    res.status(200).json("test"); 
})

// https
//     .createServer(
//         {
//             key: fs.readFileSync("key.pem"),
//             cert: fs.readFileSync("cert.pem")
//         },
//         app
//     )
//     .listen(443, () => {
//         console.log("server is running at port 443");
//     })

app.listen(8000, "0.0.0.0", () => {
    console.log("server running on 8000");
})