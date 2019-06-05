const Transaction = require("../models/transactionsModel");
const User = require("../models/users");

module.exports = {
  createTransaction,
  getAllTransactions,
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

    await User.findOne({ _id: owner }, (err, user) => {
      user.transactions.push(newTransaction);
      user.save()
    })

    res.send({ newTransaction });
  } catch (err) {
    res.status(422).send(err);
  }
}

async function getAllTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find({});

    res.send(transactions);
  } catch (err) {
    res.status(422).send(err);
  }
}

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
  const { id } = req.user;
  console.log( id);
  try {
    const user = await User.find({ _id: id }).populate("transactions");

    res.send(user[0].transactions);
  } catch (err) {
    res.status(422).send(err);
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
