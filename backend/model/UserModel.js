const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);  // Make sure you're using mongoose.model here

module.exports = User;
