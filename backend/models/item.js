const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNo: {
    type: String,
    required: true,
    default: null,
  },
  price: {
    type: Number,
    required: true,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
    default: null,
  },
  discount: {
    type: Number,
    required: true,
    default: null,
  },
  currency: {
    type: String,
    required: true,
    default: "HUF",
  },
  tags: {
    type: Array,
    required: false,
  },
  specializations: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  detials: [],
});

const ItemEntity = mongoose.model("itemEntity", itemSchema);

module.exports = ItemEntity;
module.exports = itemSchema;
