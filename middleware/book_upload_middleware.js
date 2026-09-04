const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  // saving the file on local system
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  //   giving the file a unique name
  filename: function (req, file, cb) {
    const uniqueSuffix = "-" + Date.now();
    cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
  },
});

// apply the file filter
const filter = (req, file, cb) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    throw new Error("Please upload Pdf only");
  }
};
module.exports = multer({
  storage: diskStorage,
  fileFilter: filter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
