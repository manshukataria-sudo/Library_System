const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/verify_user");
const {
  allBooksController,
  addBookController,
} = require("../controllers/book_controller");
const adminMiddleware = require("../middleware/admin_middleware");

// get all books
router.get("/all", userMiddleware, allBooksController);

router.post("/add", userMiddleware, adminMiddleware, addBookController);
module.exports = router;
