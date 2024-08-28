const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("not authorized user ");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized user");
  }
});

module.exports = { protect };
