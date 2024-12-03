/* eslint-disable no-undef */
const express = require("express");
const {
  createTickets,
  getAllTickets,
  getTicketsByUserId,
  deleteTicketById,
  getBookedSeats,
} = require("./movieController");

const router = express.Router();
router.post("/ticket", createTickets);
router.get("/ticket", getAllTickets);
router.get("/booked-seats", getBookedSeats);
router.get("/ticket/:userID", getTicketsByUserId);
router.delete("/ticket/:ticketId", deleteTicketById);

module.exports = router;
