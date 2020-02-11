const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phone: String,

    email: {
        type: String,
        required: true
    },

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

    roomType:{
        type: String,
        default: "single"
    }
    
});

module.exports = mongoose.model('Booking', bookingSchema);