const express = require("express");
const router = express.Router();
const cartSchema = require("../model/cartsSchema");

// add cart
router.post("/create", async (req, res) => {
  try {
    // take reqs
    const { user_id, product_id } = req.body;

    //   map to schema
    const newCart = new cartSchema({
      user_id,
      product_id,
    });
    // save
    const addCart = await newCart.save();

    if (addCart) {
      res
        .status(202)
        .json({ msg: "cart added successfully", added_cart: addCart });
    } else {
      res.status(404).json({ msg: "failed to add cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all cart
router.get("/all", async (req, res) => {
  try {
    // query
    const allCart = await cartSchema.find();

    if (allCart) {
      res.status(202).json({
        msg: "success",
        cart_count: allCart.length,
        carts: allCart,
      });
    } else {
      res.status(404).json({ msg: "failed to get cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// single
router.get("/one/:id", async (req, res) => {
  try {
    // query
    const oneCart = await cartSchema.findOne({ _id: req.params.id });

    if (oneCart) {
      res.status(202).json({ msg: "success", cart: oneCart });
    } else {
      res.status(404).json({ msg: "failed to find category" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    // query
    const delCart = await cartSchema.findByIdAndDelete(req.params.id);

    if (delCart) {
      res.status(202).json({
        msg: "cart deleted successfully",
        category: delCart,
      });
    } else {
      res.status(404).json({ msg: "failed to get cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
