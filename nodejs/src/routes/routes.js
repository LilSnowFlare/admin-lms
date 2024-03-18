const express = require("express");
const { registrationUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/registration",registrationUser);

module.exports = userRouter;