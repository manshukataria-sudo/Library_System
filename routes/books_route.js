const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/verify_user");
const bookUploadMiddleware = require("../middleware/book_upload_middleware");
const {
  allBooksController,
  addBookController,
} = require("../controllers/book_controller");
const adminMiddleware = require("../middleware/admin_middleware");

// get all books
router.get("/all", userMiddleware, allBooksController);

// to upload the book
router.post(
  "/add",
  userMiddleware,
  adminMiddleware,
  bookUploadMiddleware.single("pdf"),
  addBookController,
);

module.exports = router;
