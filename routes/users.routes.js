const express = require("express");
const Routers = express.Router();
const { register, login } = require("./../controllers/users.controller");
Routers.route("/register").post(register);
Routers.route("/login").post(login);
module.exports = Routers;
