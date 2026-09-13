const express = require("express");
const userMiddleware = require("../middleware/verify_user");
const welcomeUserController = require("../controllers/welcome_user_controller");
const router = express.Router();

router.get("/welcome", userMiddleware, welcomeUserController);

module.exports = router
