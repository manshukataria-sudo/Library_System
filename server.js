require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const auth_router = require("./routes/auth_routes");
const app = express();

// parse the json format
app.use(express.json());

// connectDB
connectDB();

// routes
app.use("/api/user", auth_router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runninng at port ${PORT}`);
});
