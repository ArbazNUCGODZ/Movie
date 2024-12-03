/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://localhost:27017/cinema")
  .then(() => console.log("Connection successful!.. "))
  .catch(err => console.error("Connection error: ", err));

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const userRoutes = require("./src/userRoutes");
app.use("/api/v1/user", userRoutes);

const movieRoutes = require("./src/MovieBooking/movieRoutes");
app.use("/api/v1/movie", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
