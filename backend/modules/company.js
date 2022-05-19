const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owners: [],
  superadmins: [],
  admins: [],
  users: [],
  storekeepers: [],
  orders: [],
  works: [],
  specializations: [],
});

const CompanyEntity = mongoose.model("companyEntity", companySchema);

module.exports = CompanyEntity;
