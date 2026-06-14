const express = require("express");

const router = express.Router();

const { createBooking, getMyBookings,updateBooking, deleteBooking } = require("../controllers/bookingController");
const isAuthenticatedUser = require("../middleware/auth");

router.post("/", isAuthenticatedUser, createBooking);
router.get("/my-bookings", isAuthenticatedUser, getMyBookings);
router.put("/:id", isAuthenticatedUser, updateBooking);
router.delete("/:id", isAuthenticatedUser, deleteBooking);

module.exports = router;