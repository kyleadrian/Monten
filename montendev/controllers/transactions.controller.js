const Transaction = require("../models/transactionsModel");
const User = require("../models/users");
const mongoose = require("mongoose");

module.exports = {
  createTransaction,
  getTransaction,
  updateTransactionCategory,
  getUserTransactions
};

async function createTransaction(req, res, next) {
  const { date } = req.body;
  const { description } = req.body;
  const { originalDescription } = req.body;
  const { amount } = req.body;
  const { transactionType } = req.body;
  const { category } = req.body;
  const { accountName } = req.body;
  const owner = req.user.id;

  if (
    !date ||
    !description ||
    !originalDescription ||
    !amount ||
    !transactionType ||
    !category ||
    !accountName
  ) {
    return res.status(422).send({ error: "Please enter all information" }); // make sure to return here otherwise the operation will continue and you will get "Get Set Header after erro"
  }

  const transaction = new Transaction({
    date,
    description,
    originalDescription,
    amount,
    transactionType,
    category,
    accountName,
    owner
  });

  try {
    const newTransaction = await transaction.save();

    res.send({ newTransaction });
  } catch (err) {
    res.status(422).send(err);
  }
}

/* async function getAllTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find({});

    res.send(transactions);
  } catch (err) {
    res.status(422).send(err);
  }
} */

async function getTransaction(req, res, next) {
  const { transactionId } = req.params;
  try {
    const transaction = await Transaction.find({ _id: transactionId });

    res.send(transaction);
  } catch (err) {
    res.status(422).send(err);
  }
}

async function getUserTransactions(req, res, next) {
  const pageNo = parseInt(req.query.pageNo);
  const size = parseInt(req.query.size);
  const searchTerm = req.query.search ? new RegExp(req.query.search, "i") : "";
  const { id } = req.user;

  let filter = {};
  const projection = {};
  const options = {};

  if (pageNo < 0 || pageNo === 0) {
    return res.send({
      error: true,
      message: "Invalid page number, please use number greater than 1."
    });
  }

  if (searchTerm) {
    // this is some code we use to filter results
    filter = {
      $or: [
        { _id: id },
        { merchant: searchTerm },
        { description: searchTerm },
        { category: searchTerm },
        { subCategory: searchTerm }
      ]
    };
  } else {
    filter.owner = id;
  }

  options.skip = size * (pageNo - 1);
  options.limit = size;

  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const transactions = await Transaction.find(filter, projection, options);

      if (transactions.length === 0) {
        return res.send({ message: `No results found` });
      }

      res.send(transactions);
    } catch (err) {
      res.status(422).send(err);
    }
  } else {
    res.send({ message: `Invalid userId` });
  }
}

async function updateTransactionCategory(req, res, next) {
  const { transactionId } = req.params;
  const { category } = req.body;

  try {
    await Transaction.updateOne(
      {
        _id: transactionId
      },
      {
        $set: { category: category }
      }
    );

    res.send({ message: `Updated category to "${category}"` });
  } catch (err) {
    res.status(422).send(err);
  }
}
