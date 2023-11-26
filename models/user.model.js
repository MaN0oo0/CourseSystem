const mongoose = require("mongoose");

const roles = require("../utils/roles");
var validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Not Valid Email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [roles.ADMIN, roles.USER, roles.MANAGER],
    default: roles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
});

module.exports = mongoose.model("User", userSchema);
