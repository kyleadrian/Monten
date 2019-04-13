const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: Date,
  description: String,
  originalDescription: String,
  amount: Number,
  transactionType: String,
  category: String,
  accountName: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" } // linking a transaction to a specific user.
});

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
