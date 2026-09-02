const verify_admin = async (req, res, next) => {
  try {
    const userRole = req.userInfo.role;
    if (userRole != "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin rights! Only",
      });
    }
    res.status(200).json({
      success: true,
      message: "Welcome admin",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = verify_admin;
