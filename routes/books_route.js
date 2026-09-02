const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/verify_user");
const { allBooksController } = require("../controllers/book_controller");

// get all books
router.get("/all", userMiddleware, allBooksController);

module.exports = router;
