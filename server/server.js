const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./middleware/auth"));
app.use("/api/home", require("./Pages/home"));
app.use("/api/about",require("./Pages/about"))
app.use("/api/contact",require("./Pages/contactus"))
app.use("/api/AllUser",require("./Pages/Alluser"))
app.use("/api/analyze",require("./routes/analyze"))
app.use("/api/generate-resume",require("./Pages/generate-resume"))

app.listen(5000, () => console.log("Server running on port 5000"));
                                                                