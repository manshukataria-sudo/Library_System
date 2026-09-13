const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/verify_user");
const bookUploadMiddleware = require("../middleware/book_upload_middleware");
const {
  allBooksController,
  addBookController,
  removeBookController,
  issueBookController,
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

// to remove a book
router.delete(
  "/remove/:id",
  userMiddleware,
  adminMiddleware,
  removeBookController,
);

// issue book to user
router.get("/issue/:id", userMiddleware, issueBookController);

module.exports = router;