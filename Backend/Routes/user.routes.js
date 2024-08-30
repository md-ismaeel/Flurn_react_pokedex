const express = require("express");
const { registration, login, logout } = require("../Controller/user.controller");
const authenticateUser = require("../Middleware/user.middleware");

const routers = express.Router()

routers.post("/register", registration)

routers.post("/login", login)

routers.get("/logout", authenticateUser, logout)

module.exports = routers