const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define model or "framework" for the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create the model in mongoose
const userModel = mongoose.model("user", userSchema);

// Export the model
module.exports = userModel;
