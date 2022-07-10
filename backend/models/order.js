const mongoose = require("mongoose");
const itemSchema = require("./item");

const orderSchema = new mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
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
    required: false,
  },
  specialization: {
    type: String,
    required: false,
    default: null,
  },
  orderList: {
    type: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        unit: {
          type: String,
          enum: ["piece", "kg", "l", "m", "m2", "m3", "box"],
          default: "piece",
          required: true,
        },
      },
    ],
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = orderSchema;
