const express = require("express");
const Booking = require('../models/booking');
const User = require('../models/user');

const bookingRouter = express.Router();

//get all bookings
bookingRouter.get('/', (req, res, next) => {
    Booking.find()
        .then(bookings => res.send(bookings))
        .catch(next);
});

//get booking by Id
bookingRouter.get('/:id', (req, res, next) => {
    Booking.findById(req.params.id)
        .then(booking => res.send(booking))
        .catch(next);
});

// create booking and add it in user's bookings collection
bookingRouter.post('/', async (req, res, next) => {
    const { userEmail, roomNumber, startDate, endDate, guests } = req.body;

    try {
        const user = await User.findOne({ _email: userEmail });
        const createdBooking = await Booking.create({ user: user.id, roomNumber, startDate, endDate, guests });
        await User.updateOne({ _id: user.id }, { $push: { bookings: createdBooking } });

        res.status(200).send('Created Successfully');
    } catch (e) {
        next(e);
    }
});

module.exports = bookingRouter;