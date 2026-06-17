const Booking = require("../models/Booking");

// Create Booking
const createBooking = async (req, res) => {
    try {

        const { name, phone, service, date, time } = req.body;

        const existingBooking = await Booking.findOne({
            user: req.user.id,
            service,
            date,
            time
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "Booking already exists from the given number for the selected date and time. Please choose a different time slot."
            });
        }

        const booking = await Booking.create({
            user: req.user.id, 
            name, phone, 
            service, 
            date, 
            time 
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//Get all booking for a specific user

const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Bookings (For Admin)
// const getAllBookings = async (req, res) => {
//     try {

//         const bookings = await Booking.find();

//         res.status(200).json({
//             success: true,
//             count: bookings.length,
//             bookings
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }
// };


// Edit Booking
const updateBooking = async (req, res) => {

    try {

        const booking = await Booking.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Booking
const deleteBooking = async (req, res) => {

    try {

        const booking = await Booking.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = { createBooking, getMyBookings, updateBooking, deleteBooking };