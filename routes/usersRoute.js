const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../model/usersSchema");

router.get("/", async (req, res) => {
  try {
    test = userSchema.find();

    if (userSchema) {
      res.status(202).json("success");
    } else {
      res.status(404).json("failed test");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    // get creds
    const { fullname, email, password } = req.body;

    // harsh password
    harshedPassword = await bcrypt.hash(password, 10);

    //   map to creds
    const newUser = userSchema({
      fullname,
      email,
      password: harshedPassword,
    });

    //   save
    const addUser = await newUser.save();

    if (addUser) {
      res
        .status(202)
        .json({ msg: "user Signed up successfully", user: addUser });
    } else {
      res.status(404).json({ msg: "failed tp Signup " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    //creds
    const { email, password } = req.body;

    //   check if user exist
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "user not found" });
    }

    //   match password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(202).json({ message: "login successful" });
  } catch (err) {
    console.log(err);
    return res.status(505).json({ message: "Internal server error" });
  }
});

// get all
router.get("/all", async (req, res) => {
  try {
    // query
    const allUsers = await userSchema.find();

    if (allUsers) {
      res
        .status(202)
        .json({ msg: " success", user_count: allUsers.length, user: allUsers });
    } else {
      res.status(404).json({ msg: "failed to get user" });
    }
  } catch (err) {
    console.log(err);
    res.status(505).json({ msg: "internal server error" });
  }
});

// single user
router.get("/one/:id", async (req, res) => {
  try {
    // query
    const singleUser = await userSchema.findOne({ _id: req.params.id });

    if (singleUser) {
      res.status(202).json({ msg: "success", user: singleUser });
    } else {
      res.status(404).json({ msg: "failed to find user" });
    }
  } catch (err) {
    console.log(err);
    res.status(505).json({ msg: "internal server error" });
  }
});

// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    // query
    const delUser = await userSchema.findByIdAndDelete(req.params.id);

    // logic
    if (delUser) {
      res.status(202).json({
        msg: "successfully deleted a user",
        deleted_user: delUser,
      });
    } else {
      res.status(404).json({ msg: "faild to delete a user" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "internal server error" });
  }
});

module.exports = router;
