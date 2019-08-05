const Transaction = require("../models/transactionsModel");
const User = require("../models/users");

module.exports = {
  getUserSnapshot
};

async function getUserSnapshot(req, res, next) {
  const owner = req.user.id;
  const user = await User.findById(owner);
  const userTransactions = await Transaction.find({ owner });
  const income = user.calculateIncome(userTransactions, "Jul");
  const expenses = user.calculateExpenses(userTransactions, "Jul");
  const categories = user.topSpendCategories(userTransactions);

  const userObject = {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    fullName: `${user.fullName}`,
    userId: `${user._id}`,
    bankInfo: {
      checkingAcctBalance: `$12,345.64`,
      savingsAcctBalance: `$43,569.12`,
      investmentAcctBalance: `103,274.67`
    },
    netSpendInfo: {
      income: `${income}`,
      expenses: `${expenses}`,
      net: `${income - expenses}`
    },
    categoryInfo: {
      categories
    }
  };

  res.send(userObject);
}
