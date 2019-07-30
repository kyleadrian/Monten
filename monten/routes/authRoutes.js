const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const passportService = require("../services/passport"); // You MUST pass the configuration to the passport service.
const authenticationController = require("../controllers/authentication.controller");

// Set up passport middelware
const requireSignIn = passport.authenticate("local", { session: false });

// Sign Up Route
authRouter.post("/api/signup", authenticationController.signup);

// Sign In Route with Auth
authRouter.post("/api/signin", requireSignIn, authenticationController.signin);

module.exports = authRouter;
