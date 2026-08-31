const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/reg_login_controller");

// register route
router.post("/register", registerUser);

// user login route
router.post("/login", loginUser);

module.exports = router;
