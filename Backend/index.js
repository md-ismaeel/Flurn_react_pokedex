const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const routers = require("./Routes/user.routes")

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://flurnpokedexreact.netlify.app/"
    ],
    credentials: true,
};

const port = process.env.PORT || 10000;
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const mongoUri = process.env.MONGODB_URI
// const mongoUriCompass = process.env.MONGODB_COMPASS

mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connection established successfully"))
    .catch((err) => console.log("ThugBOSS-ERROR occurred while connecting to the database: " + err));

app.use("/api/v1/user", routers)

app.use("/*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "path not found!!"
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error occurred while starting the server: " + err);
    } else {
        console.log(`Server is up and running on port ${port}`);
    }
});
