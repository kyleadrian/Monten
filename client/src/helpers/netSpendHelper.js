import _ from "lodash";
import moment from "moment";

export const dateRanges = {
  todaysDate: moment().format("MM/DD/YYYY"),
  oneWeekAgo: moment()
    .subtract(7, "days")
    .calendar(),
  oneMonthAgo: moment()
    .subtract(30, "days")
    .calendar(),
  oneYearAgo: moment()
    .subtract(365, "days")
    .calendar()
};

/**
 * NET SPEND HELPERS ==========================================================================================================================================
 */
export const calculateIncome = (transactions, date) => {
  const income = _.chain(transactions)
    .filter(transaction => {
      if (
        transaction.category === "Paycheck" &&
        moment(transaction.date).isAfter(date)
      )
        return transaction;
    })
    .map(transaction => {
      return transaction.amount;
    })
    .sum()
    .value();

  return income.toFixed(2);
};

export const calculateExpenses = (transactions, date) => {
  const toRemove = [];

  _.map(transactions, transaction => {
    if (
      transaction.category === "Credit Card Payment" ||
      transaction.category === "Transfer"
    ) {
      toRemove.push(transaction);
    }
  });

  const filteredTransactions = _.filter(transactions, transaction => {
    return !toRemove.includes(transaction);
  });

  const totalSpent = _.chain(filteredTransactions)
    .map(transaction => {
      if (moment(transaction.date).isAfter(dateRanges.oneMonthAgo)) {
        return transaction.amount;
      }
    })
    .sum()
    .value();
  return totalSpent.toFixed(2);
};

export const calculateNet = transactions => {
  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);

  return (income - expenses).toFixed(2);
};

/* export const calculateExpenses = (transactions, date) => {
  const toRemove = [];

  transactions.map(transaction => {
    if (transaction.category === "Credit Card Payment") {
      toRemove.push(transaction);
    }
  });

  console.log(toRemove);

  const filteredTransactions = transactions.filter(transaction => {
    return !toRemove.includes(transaction);
  });

  const expenseAmounts = filteredTransactions.map(transaction => {
    if (moment(transaction.date).isAfter(dateRanges.oneMonthAgo)) {
      return transaction.amount;
    }
  });

  const totalSpent = expenseAmounts.reduce((previous, amount) => {
    return previous + amount;
  });

  return totalSpent.toFixed(2);
}; */

// =====================================================================================================================================================================

/**
 * SPEND CATEGORY HELPERS ==========================================================================================================================================
 */
