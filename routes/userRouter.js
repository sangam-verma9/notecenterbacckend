const express = require("express");
const {
  registeruser,
  authuser,
  text,
} = require("../controllers/userControler");
const router = express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(authuser);
router.route("/text").post(text);

module.exports = router;
