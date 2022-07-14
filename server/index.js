const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

mongoose.connect("mongodb://localhost:27017/login-data");

app.get("/", (req, res) => {
  res.send("Hallow World");
});
app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "Ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error" });
  }
});
app.post("/api/login",async (req, res) => {
  const user =await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  console.log(user);
  if (user) {
    res.status(200).json({ status: "ok" ,user:true});
    
  } else {
    res.status(400).json({ status: "error",user:false });
  }
});

app.listen(PORT, () => {
  console.log(`Server Start on Port ${PORT}`);
});
