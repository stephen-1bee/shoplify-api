const mongoose = require("mongoose");

const con = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hoplifyStore");
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
};
module.exports = con