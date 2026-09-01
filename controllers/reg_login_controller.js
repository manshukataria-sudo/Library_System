require("dotenv").config();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// user login controller
const loginUser = async (req, res) => {
  try {
    // fetch user's email and password
    const { email, password } = req.body;

    // check if user exists with this email
    const checkUser = await userModel.findOne({ email: email });
    if (!checkUser) {
      return res.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // fetch hashed password from DB
    const hashedPassword = checkUser.password;

    // check the password
    bcrypt
      .compare(password, hashedPassword)
      .then(function (result) {
        if (result) {
          // if password match create a token and send it
          const accessToken = jwt.sign(
            {
              username: checkUser.username,
              email: email,
              role: checkUser.role,
            },
            process.env.jwt_secret,
            { expiresIn: "1h" },
          );
          res.status(200).json({
            success: true,
            message: "User logged in Successfully",
            token: accessToken,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Invalid credential",
          });
        }
      })
      .catch((e) => {
        res.status(403).json({
          success: false,
          message: "Password Comparison failed",
        });
      });
  } catch (e) {
    console.log("There is an error", e);
    res.status(500).json({
      success: false,
      message: "Unable to login",
      error: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
