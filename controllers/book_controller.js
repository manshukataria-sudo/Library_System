const bookModel = require("../models/books");
const { uploadData } = require("../config/upload_data_to_cloud");
const fs = require("fs");
const allBooksController = async (req, res) => {
  try {
    // use paging to display the books
    // count total docs
    const totalDocs = await bookModel.countDocuments({});

    // set the limit to display
    const limit = parseInt(req.query.limit) || 2;

    // set the page no.
    const pageNo = parseInt(req.query.page) || 1;

    // to skip docs
    const skip = (pageNo - 1) * limit;

    // total pages
    const totalPages = Math.ceil(totalDocs / limit);
    // fetch the page and send the response

    // sort on the basis of
    const sortBy = req.query.sortBy || "createdAt";

    // sort order
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const sort = {};
    sort[sortBy] = sortOrder;
    const fetchedBooks = await bookModel
      .find({})
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (!fetchedBooks.length) {
      return res.status(404).json({
        success: true,
        message: "No Book to display",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched Successfully",
      pageNo: pageNo,
      totalPages: totalPages,
      totalBooks: totalDocs,
      Books: fetchedBooks,
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
