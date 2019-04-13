const express = require("express");
const transactionRouter = express.Router();
const passport = require("passport");
const passportService = require("../services/passport");
const transactionController = require("../controllers/transactions.controller");

const requireAuth = passport.authenticate("jwt", { session: false });

transactionRouter.post(
  "/transactions",
  requireAuth,
  transactionController.createTransaction
);

transactionRouter.get(
  "/transactions",
  requireAuth,
  transactionController.getTransactions
);

module.exports = transactionRouter;
