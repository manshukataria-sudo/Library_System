require("dotenv").config();
const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  try {
    // check if authtoken has arrived
    const authToken = req.headers.authorization;
    const bearerToken = authToken && authToken.split(" ")[1];
    if (!bearerToken) {
      return res.status(403).json({
        success: false,
        message: "Access denied! User access only",
      });
    }

    // check if the token is correct
    jwt.verify(bearerToken, process.env.jwt_secret, (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(403).json({
          success: false,
          message: "Access denied! Token not verified",
        });
      }
      req.userInfo = decoded;
      next();
    });
  } catch (e) {
    console.log("there is an error ", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = userMiddleware;
