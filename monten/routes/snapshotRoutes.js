const express = require("express");
const snapshotRouter = express();
const passport = require("passport");
const passportService = require("../services/passport");
const snapshotController = require("../controllers/snapshot.controller");

const requireAuth = passport.authenticate("jwt", { session: false });

snapshotRouter.get(
  "/api/snapshot",
  requireAuth,
  snapshotController.getUserSnapshot
);

module.exports = snapshotRouter;
