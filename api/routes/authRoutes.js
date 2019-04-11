const express = require("express");
const authRouter = express.Router();
const authenticationController = require("../controllers/authentication.controller");

// Sign Up Route
authRouter.post("/signup", authenticationController.signup);

module.exports = authRouter;
