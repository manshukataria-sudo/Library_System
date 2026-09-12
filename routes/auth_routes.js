const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth_controller");
const userMiddleware = require("../middleware/verify_user");

// register route
router.post("/register", registerUser);

// user login route
router.post("/login", loginUser);

// change password route
router.post("/changepassword", userMiddleware, changePassword);

module.exports = router;
