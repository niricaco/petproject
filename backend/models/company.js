const mongoose = require("mongoose");
const itemSchema = require("../models/item");
const orderSchema = require("./order");

const roleSchema = new mongoose.Schema({
  superadmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  storekeepers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owners: {
    type: Array,
    required: true,
  },
  roles: [roleSchema],
  orders: [orderSchema],
  works: [],
  specializations: [],
  items: [itemSchema],
});

const CompanyEntity = mongoose.model("companyEntity", companySchema);

module.exports = CompanyEntity;
