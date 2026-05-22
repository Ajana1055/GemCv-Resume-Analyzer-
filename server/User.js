const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Recommended to prevent duplicate accounts
    lowercase: true, // Ensures email is saved in lowercase
    trim: true, // Removes accidental whitespace
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"] // Ensures @ and a domain
  },
  password: {
    type: String,
    required: true
  },
  photo: String
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);