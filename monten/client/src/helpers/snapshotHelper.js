import _ from "lodash";
import moment from "moment";

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
    .ceil()
    .value();

  return income;
};

export const calculateExpenses = (transactions, date) => {
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
      if (moment(transaction.date).isAfter(date)) {
        return transaction.amount;
      }
    })
    .sum()
    .ceil()
    .value();

  return totalSpent;
};

// =====================================================================================================================================================================

/**
 * TOP SPEND HELPER
 */

export const topSpendCategories = transactions => {
  let currentCategory = null;
  let count = 0;
  const categoryCount = [];

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
        count++;
      }
    })
    .value();

  const categoriesWithoutCreditCardPaymentsAndTransfers = _.chain(categoryCount)
    .reject(({ category }) => {
      if (category === "Credit Card Payment" || category === "Transfer") {
        return category;
      }
    })
    .orderBy("count", "desc")
    .slice(0, 3)
    .value();

  return categoriesWithoutCreditCardPaymentsAndTransfers;
};
