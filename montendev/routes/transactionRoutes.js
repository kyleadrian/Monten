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

//GET ALL TRANSACTIONS -
//----- Hidden API --------//
/* transactionRouter.get(
  "/api/transactions",
  requireAuth,
  transactionController.getTransactionsByUser
); */
transactionRouter.get(
  "/api/transactions",
  requireAuth,
  transactionController.getUserTransactions
);

//GET A TRANSACTION
transactionRouter.get(
  "/api/transactions/:transactionId",
  requireAuth,
  transactionController.getTransaction
);

//UPDATE TRANSACTION
transactionRouter.put(
  "/api/transactions/:transactionId/edit",
  transactionController.updateTransactionCategory
);

module.exports = transactionRouter;
