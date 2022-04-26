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
const searchRoute = require("./routes/search");
const uploadRoute = require("./routes/upload");

const corsOptions = {
  origin: process.env.CLIENT_BASE_URL,
  credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use("/public", express.static("public"));

// app.use("/", cors(corsOptions), authRoute);
app.use("/", authRoute);
app.use("/post/", postRoute);
app.use("/user/", userRoute);
app.use("/profile/", profileRoute);
app.use("/comment/", commentRoute);
app.use("/search/", searchRoute);
app.use("/upload", uploadRoute);

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