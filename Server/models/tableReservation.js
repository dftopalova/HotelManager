const mongoose = require('mongoose');

const tableReservationSchema = new mongoose.Schema({

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

    countPeople: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TableReservation', tableReservationSchema);