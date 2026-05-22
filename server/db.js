const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI;
const connectDB = async () => {
  try {
   // await mongoose.connect("mongodb+srv://aj1055:aj1055@cluster0.slha3vh.mongodb.net/login_sign");
        await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
