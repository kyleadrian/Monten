const Transaction = require("../models/transactionsModel");

module.exports = {
  createTransaction,
  getTransactions
};

async function createTransaction(req, res, next) {
  const { date } = req.body;
  const { description } = req.body;
  const { originalDescription } = req.body;
  const { amount } = req.body;
  const { transactionType } = req.body;
  const { category } = req.body;
  const { accountName } = req.body;

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
    _user: req.user.id
  });

  try {
    const newTransaction = await transaction.save();

    res.send({ newTransaction });
  } catch (err) {
    res.status(422).send(err);
  }
}

async function getTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find({});

    res.send(transactions);
  } catch (err) {
    res.status(422).send(err);
  }
}
