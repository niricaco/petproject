const mongoose = require("mongoose");

const defaultWorkAndSpecializationSchema = new mongoose.Schema({
  work: {
    type: String,
    required: true,
    default: false,
  },
  specialization: {
    type: String,
    required: true,
    default: false,
  },
});

const providerSchema = new mongoose.Schema({
  google: {
    type: String,
    sparse: true,
    unique: true,
  },
});

const confirmSchema = new mongoose.Schema({
  isConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  secureRandom: {
    type: String,
    required: true,
  },
  dateOfRegistration: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orders: [],
  lastSeen: {
    type: Date,
  },
  workAndSpecialization: defaultWorkAndSpecializationSchema,
  providers: [providerSchema],
  confirm: confirmSchema,
});

const UserEntity = mongoose.model("userEntity", userSchema);

module.exports = UserEntity;
