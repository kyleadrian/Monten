const express = require("express");
const snapshotRouter = express();
const passport = require("passport");
const passportService = require("../services/passport");
const snapshotController = require("../controllers/snapshot.controller");

const requireAuth = passport.authenticate("jwt", { session: false });

// <--- Get user snapshot with all categories --->
snapshotRouter.get(
  "/api/snapshot",
  requireAuth,
  snapshotController.getUserSnapshot
);

// Get user snapshot with categories for a specific month --->
snapshotRouter.get(
  "/api/snapshot/:month",
  requireAuth,
  snapshotController.getUserSnapshot
);

module.exports = snapshotRouter;
