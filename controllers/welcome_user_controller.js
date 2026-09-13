const userModel = require("../models/users");
const welcomeUser = async (req, res) => {
  try {
    // fetch the userinfo from DB
    const fetchedUser = await userModel
      .findById(req.userInfo.userId)
      .populate("books_issued");

    res.status(200).json({
      success: true,
      message: "Welcome user",
      data: fetchedUser,
    });
  } catch (error) {
    console.log("there is an error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

module.exports = welcomeUser;
