const Transaction = require("../models/transactionsModel");
const User = require("../models/users");

module.exports = {
  getUserSnapshot
};

async function getUserSnapshot(req, res, next) {
  const owner = req.user.id;
  const month = req.params.month;
  const user = await User.findById(owner);
  const userCredits = await Transaction.find({
    owner,
    transactionType: "credit"
  });
  const userDebits = await Transaction.find({
    owner,
    transactionType: "debit"
  });

  const income = user.calculateIncome(userCredits, month);
  const expenses = user.calculateExpenses(userDebits, month);
  const categoryInfo = user.topSpendCategories(userDebits, month);

  const userObject = {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    fullName: `${user.fullName}`,
    userId: `${user._id}`,
    bankInfo: {
      checkingAcctBalance: `1234564`,
      savingsAcctBalance: `4356912`,
      investmentAcctBalance: `11327467`
    },
    netSpendInfo: {
      income,
      expenses,
      net: income - expenses
    },
    categoryInfo
  };

  res.send(userObject);
}
