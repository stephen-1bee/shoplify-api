const express = require("express");
const router = express.Router();
const productSchema = require("../model/productsSchema");

// add product
router.post("/create", async (req, res) => {
  try {
    // take reqs
    const { title, description, price, cart, rating } = req.body;

    //   map to schema
    const newProduct = new productSchema({
      title,
      description,
      price,
      cart,
      rating,
    });
    // save
    const addProduct = await newProduct.save();

    if (addProduct) {
      res
        .status(202)
        .json({ msg: "product added successfully", product: addProduct });
    } else {
      res.status(404).json({ msg: "failed to add product" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all products
router.get("/all", async (req, res) => {
  try {
    // query
    const allProducts = await productSchema.find();

    if (allProducts) {
      res.status(202).json({
        msg: "success",
        product_count: allProducts.length,
        products: allProducts,
      });
    } else {
      res.status(404).json({ msg: "failed to get products" });
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
    const oneProduct = await productSchema.findOne({ _id: req.params.id });

    if (oneProduct) {
      res.status(202).json({ msg: "success", product: oneProduct });
    } else {
      res.status(404).json({ msg: "failed to find products" });
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
    const delProduct = await productSchema.findByIdAndDelete(req.params.id);

    if (delProduct) {
      res
        .status(202)
        .json({ msg: "product deleted successfully", product: delProduct });
    } else {
      res.status(500).json({ msg: "failed to get products" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
