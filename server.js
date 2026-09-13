require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const auth_router = require("./routes/auth_routes");
const book_router = require("./routes/books_route");
const user_router = require("./routes/welcome_route");
const app = express();

// parse the json format
app.use(express.json());

// connectDB
connectDB();

// auth_router => register and login
app.use("/api/user/auth", auth_router);

// get available books
app.use("/api/books", book_router);

// user welcome route
app.use("/api/user", user_router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runninng at port ${PORT}`);
});
