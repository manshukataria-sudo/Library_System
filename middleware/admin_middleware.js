const verify_admin = async (req, res, next) => {
  try {
    const userRole = req.userInfo.role;
    if (userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Admin rights required",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = verify_admin;
