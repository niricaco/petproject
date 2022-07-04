const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, minlength: 4 },
  password: { type: String, minlength: 4 },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
