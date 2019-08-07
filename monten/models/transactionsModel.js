const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" }, // linking a transaction to a specific user.
  date: String,
  merchant: String,
  description: String,
  amount: Number,
  transactionType: String,
  category: String,
  accountName: String
});

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
