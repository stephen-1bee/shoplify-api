const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  photo: {
    type: String,
    require: true,
    default: null,
  },
  title: {
    type: String,
    require: true,
    default: null,
  },
  description: {
    type: String,
    require: true,
    default: null,
  },
  price: {
    type: Number,
    require: true,
    default: null,
  },
  rating: {
    type: Number,
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

module.exports = mongoose.model("productSchema", productSchema, "products");
