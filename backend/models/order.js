const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  orderedBy: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCollected: {
    type: Boolean,
    required: true,
    default: false,
  },
  isShipped: {
    type: Boolean,
    required: true,
    default: false,
  },
  work: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: false,
    default: null,
  },
  detials: [],
  orderDate: {
    type: Date,
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
  },
});

const OrderEntity = mongoose.model("orderEntity", orderSchema);

module.exports = OrderEntity;
