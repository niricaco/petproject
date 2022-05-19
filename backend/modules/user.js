const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companies: [],
  orders: [],
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  selectedJob: {
    type: String,
    required: true,
    default: null,
  },
  selectedRole: {
    type: String,
    required: true,
    default: null,
  },
  lastSeen: {
    type: Date,
  },
});

const UserEntity = mongoose.model("userEntity", userSchema);

module.exports = UserEntity;
