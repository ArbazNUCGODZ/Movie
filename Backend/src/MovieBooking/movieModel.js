/* eslint-disable no-undef */
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      required: [true, "Invalid userID"],
    },
    movieID: {
      type: String,
      // ref: "Movie",
      required: [true, "Invalid movieID"],
    },
    movieName: {
      type: String,
      required: [true, "Invalid movieName"],
    },
    moviePoster: {
      type: String,
      required: [true, "Invalid moviePoster"],
    },
    city: {
      type: String,
      required: [true, "Invalid city"],
    },
    theater: {
      type: String,
      required: [true, "Invalid theater"],
    },
    date: {
      type: String,
      required: [true, "Invalid date"],
    },
    time: {
      type: String,
      required: [true, "Invalid time"],
    },
    seats: {
      type: [String],
      required: [true, "Invalid seats"],
    },
  },
  {
    indexes: [
      { userID: 1 }, // Ensure no unique constraint is set here
    ],
  }
);

movieSchema.index(
  { movieID: 1, theater: 1, date: 1, time: 1, seats: 1 },
  { unique: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
