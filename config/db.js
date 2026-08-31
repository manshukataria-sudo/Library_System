require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "library_system",
    });
    console.log("MONGODB connected successfully");
  } catch (e) {
    console.log("MONGODB connection failed : ", e);
  }
};

module.exports = connectDB;
