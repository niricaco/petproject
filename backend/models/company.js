const mongoose = require("mongoose");
const itemSchema = require("../models/item");
const orderSchema = require("./order");
const roleSchema = require("./role");
const codeSchema = require("./code");
const inviteSchema = require("./invite");

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  codes: [codeSchema],
  invites: [inviteSchema],
  roles: [roleSchema],
  orders: [orderSchema],
  works: [],
  specializations: [],
  items: [itemSchema],
});

const CompanyEntity = mongoose.model("companyEntity", companySchema);

module.exports = CompanyEntity;
