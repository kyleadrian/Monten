const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");
const _ = require("lodash");
const moment = require("moment");
const filter = require("../ml/filters");

// Define model or "framework" for the model
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

userSchema.methods.calculateIncome = function(
  transactions,
  selectedMonth = moment()
    .subtract(1, "months")
    .format("MMM")
) {
  const income = _.chain(transactions)
    .filter(({ subCategory, date, amount }) => {
      if (
        subCategory === "Paycheck" &&
        moment(date).format("MMM") === selectedMonth
      )
        return amount;
    })
    .sumBy("amount")
    .ceil()
    .value();

  return Number(income);
};

userSchema.methods.calculateExpenses = function(
  transactions,
  selectedMonth = moment()
    .subtract(1, "months")
    .format("MMM")
) {
  const totalSpent = _.chain(transactions)
    .filter(({ category, merchant, amount, date }) => {
      if (moment(date).format("MMM") === selectedMonth) {
        if (
          !(
            category === "Non Spending" &&
            filter.nonSpendTransfers().includes(merchant)
          )
        ) {
          return amount;
        }
      }
    })
    .sumBy("amount")
    .ceil()
    .value();

  return Number(totalSpent);
};

userSchema.methods.topSpendCategories = function(
  transactions,
  selectedMonth = moment()
    .subtract(1, "months")
    .format("MMM")
) {
  const groupedTransactions = _.chain(transactions)
    .filter(({ category, merchant }) => {
      if (
        !(
          category === "Non Spending" &&
          filter.nonSpendTransfers().includes(merchant)
        )
      ) {
        return category;
      }
    })
    .map(({ category, amount, date }) => {
      return {
        category,
        amount,
        month: moment(date).format("MMM")
      };
    })
    .groupBy("month")
    .value();

  const categorizedTransactions = Object.keys(groupedTransactions).map(key => {
    const categories = {
      month: `${key} ${new Date().getFullYear()}`,
      total: groupedTransactions[key].reduce((totalAmount, { amount }) => {
        return totalAmount + amount;
      }, 0),
      categories: _.chain(groupedTransactions[key])
        .reduce((totalAmount, { category, amount }) => {
          if (!totalAmount[category]) {
            totalAmount[category] = {
              category: category,
              amount: 0,
              transactions: 1
            };
          }

          totalAmount[category].amount += amount;
          totalAmount[category].transactions += 1;

          return totalAmount;
        }, {})
        .values()
        .orderBy("amount", "desc")
        .value()
    };

    return categories;
  });

  if (selectedMonth) {
    const monthCategory = categorizedTransactions.filter(
      categorizedTransaction => {
        if (categorizedTransaction.month.includes(selectedMonth)) {
          return categorizedTransaction;
        }
      }
    );

    return monthCategory;
  } else {
    return categorizedTransactions;
  }
};

// Create the model in mongoose
const userModel = mongoose.model("user", userSchema);

// Export the model
module.exports = userModel;
