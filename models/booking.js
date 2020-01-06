const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    days: Number,
    totalPrice: Number,
    guests: Number,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Booking', bookingSchema);