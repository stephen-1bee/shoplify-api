const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
    default: null,
  },
  email: {
    type: String,
    require: true,
    default: null,
  },
  password: {
    type: String,
    require: true,
    default: null, 
  },
  dateUpdated: {
    type: Date,
    default: new Date(),
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("userSchema", userSchema, "users");
