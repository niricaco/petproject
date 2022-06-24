const mongoose = require("mongoose");
const ItemEntity = require("../models/item");

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
  orders: [],
  works: [],
  specializations: [],
  items: [ItemEntity],
});

const CompanyEntity = mongoose.model("companyEntity", companySchema);

module.exports = CompanyEntity;

/* item schema or item model??? */
