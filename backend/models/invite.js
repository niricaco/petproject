const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  _id: false,
  email: {
    type: String,
    required: true,
  },
});

module.exports = inviteSchema;
