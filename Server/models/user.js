const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: (email) => {
                    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return emailRegex.test(email)
                },
                message: props => `${props.value} is not a valid email!`
            }
        ]
    },

    phone: String,

    roomNumber: Number,

    bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}]

});

module.exports = mongoose.model('User', userSchema);