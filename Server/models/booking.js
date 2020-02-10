const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    roomNumber: Number,

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
    
    guests: {
        type: Number,
        min: 1,
        max: 4
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Booking', bookingSchema);