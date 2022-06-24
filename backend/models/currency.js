const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  officialShort: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: null,
  },
});

const CurrencyEntity = mongoose.model("currencyEntity", currencySchema);

module.exports = CurrencyEntity;
