const userModel = require("../models/users");
const bcrypt = require("bcrypt");

// register user controller
const registerUser = async (req, res) => {
  try {
    // fetch the user from req.body
    const fetchedUser = req.body;
    if (!fetchedUser) {
      return res.status(403).json({
        success: false,
        message: "kindly fill the required details",
      });
    }

    // check if user exists with current email
    const doMailExists = await userModel.findOne({ email: fetchedUser.email });
    if (doMailExists) {
      return res.status(403).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // check if the user has sent the password to store
    const isPassword = fetchedUser.password;
    if (!isPassword) {
      return res.status(403).json({
        success: false,
        message: "Password field can't be empty",
      });
    }

    // hash the password
    bcrypt
      .hash(fetchedUser.password, 10)
      .then(function (hash) {
        fetchedUser.password = hash;
        userModel.create(fetchedUser);
      })
      .then(() => {
        res.status(201).json({
          success: true,
          message: "User registered Successfully",
          user_info: {
            username: fetchedUser.username,
            email: fetchedUser.email,
            role: fetchedUser.role,
          },
        });
      })
      .catch((e) => {
        res.status(500).json({
          success: false,
          message: "Unable to store to DB",
        });
      });
  } catch (e) {
    console.log("There is an error", e);
    res.status(500).json({
      success: false,
      message: "Unable to register",
      error: "Internal server error",
    });
  }
};
const loginUser = (req, res) => {};

module.exports = { registerUser, loginUser };
