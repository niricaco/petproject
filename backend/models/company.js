const mongoose = require("mongoose");
const itemSchema = require("../models/item");
const orderSchema = require("./order");
const roleSchema = require("./role");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  roles: roleSchema,
  orders: [orderSchema],
  works: [],
  specializations: [],
  items: [itemSchema],
});

const CompanyEntity = mongoose.model("companyEntity", companySchema);

module.exports = CompanyEntity;
