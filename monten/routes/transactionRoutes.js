const express = require("express");
const transactionRouter = express.Router();
const passport = require("passport");
const passportService = require("../services/passport");
const transactionController = require("../controllers/transactions.controller");

const requireAuth = passport.authenticate("jwt", { session: false });

//CREATE A TRANSACTION
transactionRouter.post(
  "/api/transactions",
  requireAuth,
  transactionController.createTransaction
);

/* transactionRouter.get(
  "/transactions",
  requireAuth,
  transactionController.getTransactions
); */

//GET ALL TRANSACTIONS
transactionRouter.get(
  "/api/transactions",
  requireAuth,
  transactionController.getTransactionsByUser
);

//UPDATE TRANSACTION
transactionRouter.put(
  "/api/transactions/:transactionId/edit",
  transactionController.updateTransactionCategory
);

module.exports = transactionRouter;
