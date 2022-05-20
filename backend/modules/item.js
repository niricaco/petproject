const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
});

const OrderEntity = mongoose.model("orderEntity", orderSchema);

module.exports = OrderEntity;
