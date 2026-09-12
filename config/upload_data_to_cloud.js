const cloudinary = require("../config/cloudinary");

const uploadData = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);

    // the url and other to upload to mongoDB
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (e) {
    console.log("There is an error while uploading to cloud", e);
  }
};

const removeData = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("There is an error while deleting from cloud", error);
  }
};

module.exports = {
  uploadData,
  removeData,
};
