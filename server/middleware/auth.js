const express = require("express");
const app=express();
const router = express.Router();
const User = require("../User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

 console.log("Email:", email);

if (existingUser) {
  console.log("User already exists condition triggered");
  

   res.json({
    message: "User already exists",
    
  });

  console.log('hello')
}

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  //token
  const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

   res.status(200).json({ message: "Signup successful" ,
    token,
    user:{
        id: user._id,
        name: user.name,
        email: user.email
      }
});
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ Create token
    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    //app.use(verifyToken) 
   // verifyToken()

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
                                                       
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;




//---login/signup with google
router.post("/google", async (req, res) => {
  const { name, email, photo } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: "google_auth",
      photo, // ✅ save photo
    });
  } else {
    // update photo if changed
    user.photo = photo;
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
    expiresIn: "1d",
  });

  res.json({ token, user });
});