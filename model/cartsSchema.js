const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    default: null,
  },
  product_id: {
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

module.exports = mongoose.model("cartSchema", cartSchema, "carts");
