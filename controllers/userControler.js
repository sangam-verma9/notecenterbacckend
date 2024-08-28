const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken");

const registeruser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userexist = await User.findOne({ email });
  // console.log(userexist);
  if (userexist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const newuser =await User.create({ name, email, password });
  if (newuser) {
    res.status(201).json({
      _id: newuser._id,
      name: newuser.name,
      password: newuser.password,
      token: generateToken(newuser._id),
    });
  } else {
    throw new Error("not registered");
  }
});

const text = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userexist = await User.findOne({ email });
  console.log(userexist);
  // if (userexist) {
  //   res.status(400);
  //   throw new Error("user already exist");
  // }
  // const newuser = User.create({ name, email, password });
  // if (newuser) {
  //   res.status(201).json({
  //     _id: newuser._id,
  //     name: newuser.name,
  //     password: newuser.password,
  //   });
  // } else {
  //   throw new Error("not registered");
  // }
});

const authuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const existuser = await User.findOne({ email });
  // console.log(existuser);
  if(!existuser){
    throw new Error("envalid email or password");
  }
  try {
    const ispassword = await bcrypt.compare(password, existuser.password);
    if (ispassword) {
      res.json({
        _id: existuser._id,
        name: existuser.name,
        email: existuser.email,
        isAdmin: existuser.isAdmin,
        token: generateToken(existuser._id),
      });
    } else {
      res.status(400).send("invalid");

      throw new Error("envalid email or password");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = { registeruser, authuser, text };
