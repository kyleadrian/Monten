const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const passportService = require("../services/passport"); // You must pass the configuration to the passport service.
const authenticationController = require("../controllers/authentication.controller");

// Set up passport middelware
const requireSignIn = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

// Test Auth
authRouter.get("/", requireAuth, (req, res) => {
  res.send({ hi: "there" });
});

// Sign Up Route
authRouter.post("/signup", authenticationController.signup);

// Sign In Route with Auth
authRouter.post("/signin", requireSignIn, authenticationController.signin);

module.exports = authRouter;
