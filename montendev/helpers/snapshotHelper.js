const _ = require("lodash");
const moment = require("moment");

/**
 * NET SPEND HELPERS ==========================================================================================================================================
 */

module.exports = {
  calculateExpenses,
  calculateIncome,
  topSpendCategories
};

function calculateIncome(transactions, month) {
  const income = _.chain(transactions)
    .filter(transaction => {
      if (transaction.category === "Paycheck") return transaction;
    })
    .map(transaction => {
      return transaction.amount;
    })
    .sum()
    .ceil()
    .value();

  return income;
}

/* function calculateIncome(transactions, sortByDate) {
  const income = _.chain(transactions)
    .filter(transaction => {
      if (
        transaction.category ===
        "Paycheck" &&
        moment(transaction.date).isAfter(sortByDate)
      )
        return transaction;
    })
    .map(transaction => {
      return transaction.amount;
    })
    .sum()
    .ceil()
    .value();

  return income;
} */

function calculateExpenses(transactions) {
  const totalSpent = _.chain(transactions)
    .reject(transaction => {
      if (
        transaction.category === "Credit Card Payment" ||
        transaction.category === "Transfer"
      ) {
        return transaction;
      }
    })
    .map(transaction => {
      return transaction.amount;
    })
    .sum()
    .ceil()
    .value();

  return totalSpent;
}

/* function calculateExpenses(transactions, sortByDate) {
  const totalSpent = _.chain(transactions)
    .reject(transaction => {
      if (
        transaction.category === "Credit Card Payment" ||
        transaction.category === "Transfer"
      ) {
        return transaction;
      }
    })
    .map(transaction => {
      if (moment(transaction.date).isAfter(sortByDate)) {
        return transaction.amount;
      }
    })
    .sum()
    .ceil()
    .value();

  return totalSpent;
} */

// =====================================================================================================================================================================

/**
 * TOP SPEND HELPER
 */

function topSpendCategories(transactions) {
  const categoryInfo = [];
  const categoryAmount = [];

  _.chain(transactions)
    .reject(({ category }) => {
      // consider making the below an array to tighten up code and make more scalable. FOr instance if user is filtering, category can get pushed to array to exclude
      if (
        category === "Credit Card Payment" ||
        category === "Transfer" ||
        category === "ATM Fee" ||
        category === "Paycheck" ||
        category === "Income"
      ) {
        return category;
      }
    })
    .sortBy("category")
    .forEach(({ category, amount }) => {
      categoryInfo.push({ category, amount });
    })
    .value();

  _.chain(categoryInfo)
    .reduce((totalAmount, { category, amount, date }) => {
      if (!totalAmount[category]) {
        totalAmount[category] = { category: category, amount: 0, date };
        categoryAmount.push(totalAmount[category]);
      }
      totalAmount[category].amount += amount;
      console.log(totalAmount);
      return totalAmount;
    }, {})
    .value();

  const sortedAmount = _.chain(categoryAmount)
    .orderBy("amount", "desc")
    .value();

  return sortedAmount;
}

/* function topSpendCategories(transactions, sortByDate) {
  const categoryInfo = [];
  const categoryAmount = [];

  _.chain(transactions)
    .filter(transaction => {
      if (moment(transaction.date).isAfter(sortByDate)) {
        return transaction;
      }
    })
    .reject(({ category }) => {
      // consider making the below an array to tighten up code and make more scalable. FOr instance if user is filtering, category can get pushed to array to exclude
      if (
        category === "Credit Card Payment" ||
        category === "Transfer" ||
        category === "ATM Fee" ||
        category === "Paycheck" ||
        category === "Income"
      ) {
        return category;
      }
    })
    .sortBy("category")
    .forEach(({ category, amount }) => {
      categoryInfo.push({ category, amount });
    })
    .value();

  _.chain(categoryInfo)
    .reduce((totalAmount, { category, amount }) => {
      if (!totalAmount[category]) {
        totalAmount[category] = { category: category, amount: 0 };
        categoryAmount.push(totalAmount[category]);
      }
      totalAmount[category].amount += amount;
      return totalAmount;
    }, {})
    .value();

  const sortedAmount = _.chain(categoryAmount)
    .orderBy("amount", "desc")
    .value();

  return sortedAmount;
} */

/* let currentCategory = null;
let count = 0;
const categoryCount = [];
export const topSpendCategories = (transactions, sortByDate) => {
  const categoryInfo = [];

  _.chain(transactions)
    .map(({ category }) => {
      return category;
    })
    .sortBy()
    .forEach(category => {
      if (category !== currentCategory) {
        if (count > 0) {
          categoryCount.push({
            category: currentCategory,
            count: count
          });
        }
        currentCategory = category;
        count = 1;
      } else {
        count++; */

/* export const topSpendCategories = (transactions, prevDate) => {
  const categoryCount = [];

  _.chain(transactions)
    .reject(({ category }) => {
      if (
        category === "Credit Card Payment" ||
        category === "Transfer" ||
        category === "Uncategorized"
      ) {
        return category;
      }
    })
    .forEach(({ amount, category, date }) => {
      if (moment(date).isAfter(prevDate)) {
        categoryCount.push({
          category,
          amount
        });
      }
    })
    .value();

  const arrayOfCategories = _.chain(categoryCount)
    .countBy("category")
    .keys()
    .map(key => {
      return { category: key, count: categoryCount[key] };
    })
    .value();

  console.log(arrayOfCategories);
} */
