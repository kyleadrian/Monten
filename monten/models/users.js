const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");
const _ = require("lodash");
const moment = require("moment");

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
    .filter(transaction => {
      if (
        transaction.category === "Paycheck" &&
        moment(transaction.date).format("MMM") === selectedMonth
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

userSchema.methods.calculateExpenses = function(
  transactions,
  selectedMonth = moment()
    .subtract(1, "months")
    .format("MMM")
) {
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
      if (moment(transaction.date).format("MMM") === selectedMonth) {
        return transaction.amount;
      }
    })
    .sum()
    .ceil()
    .value();

  return totalSpent;
};

userSchema.methods.topSpendCategories = function(
  transactions,
  selectedMonth = ""
) {
  const groupedTransactions = _.chain(transactions)
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
    .map(({ category, amount, date }) => {
      return { category, amount, month: moment(date).format("MMM") };
    })
    .groupBy("month")
    .value();

  const categorizedTransactions = Object.keys(groupedTransactions).map(key => {
    const categories = {
      month: `${key} ${new Date().getFullYear()}`,
      // This reduce function takes two arguements, the totalAmount and the categoryInfo object
      // The reduce method is going to cycle through the categoryInfo array much like it would in a regular for loop
      // When the loop starts our initial value, totalAmount must be an empty object
      // We first check to see if our totalAmount contains a key with the category of the current categoryInfo object,
      // If it doesn't then we create it by setting the category to the current category and set the amount to 0.
      // If it does, we then add the amount of the current categoryInfo object to the amount of the totalAmount object.

      // Effectively there a two checks:
      // 1) Check whether or not the current object key is accounted for, if not, push it to an array.
      // 2) For any subsequent occurences of the object key, increase the selected value, in this case, ammount by the value for that key.
      total: groupedTransactions[key].reduce((totalAmount, { amount }) => {
        return totalAmount + amount;
      }, 0),
      categories: groupedTransactions[key].reduce(
        (totalAmount, { category, month, amount }) => {
          if (!totalAmount[category]) {
            totalAmount[category] = {
              amount: 0,
              transactions: 1
            };
          }

          totalAmount[category].amount += amount;
          totalAmount[category].transactions += 1;

          return totalAmount;
        },
        {}
      )
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
