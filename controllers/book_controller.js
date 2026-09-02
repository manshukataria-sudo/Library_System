const bookModel = require("../models/books");
const allBooksController = async () => {};

// add book to db and cloud via this controller
const addBookController = async (req, res) => {
  try {
    const bookInfo = req.body;
    if (!bookInfo) {
      return res.status(404).json({
        success: false,
        message: "Book details required",
      });
    }

    // upload the book to mongoDB
    const uploadBook = await bookModel.create({
      title: bookInfo.title,
      author: bookInfo.author,
      url: bookInfo.url,
      publicId: bookInfo.publicId,
      issuedTo: bookInfo.issuedTo,
    });
    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: uploadBook,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
module.exports = {
  allBooksController,
  addBookController,
};
