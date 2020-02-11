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

// create booking and add it in user's bookings collection if there is such a user in db, else create him first
bookingRouter.post('/', async (req, res, next) => {
    const { firstName, lastName, email, phone, startDate, endDate, roomType } = req.body;

    try {
        let user = User.findOne({ _email: email });
        if (!user) {
            user = await User.create({ firstName: firstName, lastName: lastName, email: email, phone: phone });
            user.save()
        }
        const createdBooking = await Booking.create({
            firstName: firstName, lastName: lastName, email: email,
            phone: phone, startDate: startDate, endDate: endDate, roomType: roomType
        });
        await User.updateOne({ _id: user.id }, { $push: { bookings: createdBooking } });

        res.status(200).send('Created Successfully');
    } catch (e) {
        next(e);
    }
});

//delete booking
bookingRouter.delete('/', (req, res, next) => {
    Booking.deleteOne({ _id: req.params.id })
    .then(deleted => res.send(deleted)
    .catch(next))
})

//update booking
bookingRouter.put('/:id', (req, res, next) => {
    const { firstName, lastName, email, phone, startDate, endDate, roomType } = req.body;
    Booking.updateOne({ _id: req.params.id }, { firstName, lastName, email, phone, startDate, endDate, roomType })
        .then(updatedBooking => res.send(updatedBooking))
        .catch(next);
});

module.exports = bookingRouter;