const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partNo: {
    type: String,
    required: false,
    default: null,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
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
