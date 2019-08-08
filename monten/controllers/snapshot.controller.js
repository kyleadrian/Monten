const Transaction = require("../models/transactionsModel");
const User = require("../models/users");

module.exports = {
  getUserSnapshot
};

async function getUserSnapshot(req, res, next) {
  const owner = req.user.id;
  const month = req.params.month;
  const user = await User.findById(owner);
  const userTransactions = await Transaction.find({ owner });
  const income = user.calculateIncome(userTransactions, month);
  const expenses = user.calculateExpenses(userTransactions, month);

  const userObject = {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    fullName: `${user.fullName}`,
    userId: `${user._id}`,
    bankInfo: {
      checkingAcctBalance: `12,345.64`,
      savingsAcctBalance: `43,569.12`,
      investmentAcctBalance: `113,274.67`
    },
    netSpendInfo: {
      income,
      expenses,
      net: income - expenses
    },
    categoryInfo: user.topSpendCategories(userTransactions, month)
  };

  res.send(userObject);
}
