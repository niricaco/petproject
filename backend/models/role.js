const mongoose = require("mongoose");

// const roleSchema = new mongoose.Schema({
//   owners: {
//     type: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     required: true,
//   },
//   admins: {
//     type: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     required: true,
//   },
//   users: {
//     type: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     required: true,
//   },
//   storekeepers: {
//     type: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     required: true,
//   },
// });
const roleSchema = new mongoose.Schema({
  _id: false,
  role: {
    type: String,
    required: true,
    enum: ["owner", "admin", "user", "storekeeper"],
    default: "user",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    ref: "User",
    required: true,
  },
});

module.exports = roleSchema;
