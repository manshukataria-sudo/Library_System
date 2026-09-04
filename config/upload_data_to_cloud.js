const cloudinary = require("./cloudinary");

const uploadData = async () => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    console.log("Data uploaded successfully");

    // the url and other to upload to mongoDB
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (e) {
    console.log("There is an errro while uploading to cloud", e);
  }
};

module.exports = {
  uploadData,
};
