const bookModel = require("../models/books");
const { uploadData } = require("../config/upload_data_to_cloud");
const fs = require("fs");
const allBooksController = async (req, res) => {
  try {
    // use paging to display the books

    // fetching all books
    const availBooks = await bookModel.find({});

    if (!availBooks) {
      return res.status(404).json({
        success: true,
        message: "No Book to display",
      });
    }
    res.status(200).json({
      success: true,
      message: "All books fetched successfully",
      Books: availBooks,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// add book to db and cloud via this controller
const addBookController = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!req.file || !title || !author) {
      return res.status(404).json({
        success: false,
        message: "Complete Book details are required",
      });
    }
    const result = await uploadData(req.file.path);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    // upload the book to mongoDB
    const uploadBook = await bookModel.create({
      title: title,
      author: author,
      url: result.url,
      publicId: result.publicId,
    });
    fs.unlinkSync(req.file.path);
    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      data: uploadBook,
    });
  } catch (e) {
    console.log("error in book add controller", e);
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
