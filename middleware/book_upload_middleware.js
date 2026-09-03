const multer = require("multer");
const path = require("path");
const diskStorage = multer.diskStorage({
  // saving the file on local system
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  
  //   giving the file a unique name
  filename: function (req, file, cb) {
    const uniqueSuffix = "-" + Date.now();
    cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
  },
});

// apply the file filter
const filter = (req, file, cb) => {
  if (file.mimetype.startswith == "pdf") {
    cb(null, true);
  } else {
    req.status(403).json({
      success: false,
      message: "Please upload Book pdf only",
    });
  }
};
module.exports = multer({
  storage: diskStorage,
  fileFilter: filter,
  limits: 50 * 1024 * 1024,
});
