/* eslint-disable no-undef */
const Movie = require("./movieModel");

// Controller to get booked seats
exports.getBookedSeats = async (req, res) => {
  const { movieID, city, theater, date, time } = req.query;

  try {
    const bookings = await Movie.find(
      { movieID, city, theater, date, time },
      "seats"
    );
    const bookedSeats = bookings.flatMap((booking) => booking.seats);
    res.status(200).json({ data: { bookedSeats } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new ticket
exports.createTickets = async (req, res) => {
  try {
    const {
      userID,
      movieID,
      movieName,
      moviePoster,
      seats,
      city,
      theater,
      date,
      time,
    } = req.body;
    const newTicket = await Movie.create({
      userID,
      movieID,
      movieName,
      moviePoster,
      seats,
      city,
      theater,
      date,
      time,
    });

    res.status(201).json({
      status: "success",
      data: {
        newTicket,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Movie.find();
    res.status(200).json({
      status: "success",
      results: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// Get tickets by user ID
exports.getTicketsByUserId = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log("Fetching tickets for userID:", userID); // Add this line
    const tickets = await Movie.find({ userID });
    res.status(200).json({
      status: "success",
      results: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

// Delete ticket by ID
exports.deleteTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    await Movie.findByIdAndDelete(ticketId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
