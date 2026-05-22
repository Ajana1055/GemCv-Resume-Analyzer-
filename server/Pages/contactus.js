const express = require("express");
const app=express()
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');

router.get("/", verifyToken, (req, res) => {
  res.send("Protected contactUs data");
});
module.exports=router;