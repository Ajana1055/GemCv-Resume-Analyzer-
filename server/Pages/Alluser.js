const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../User.js");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const { search } = req.query;

    const users = await User.find({
       name: search
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/all", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("name email");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;