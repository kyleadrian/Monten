const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  date: Date,
  description: String,
  originalDescription: String,
  amount: Number,
  transactionType: String,
  category: String,
  accountName: String
});

module.exports = transactionSchema;
