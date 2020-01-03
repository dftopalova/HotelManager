const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        validate: [
            {
                validator: (email) => {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(email.text)
                },
                message: props => `${props.value} is not a valid email!`
            }
        ]
    },

    password: {
        type:String,
        required:true,
        minlength: [3, 'Password should be at least 3 symbols!']
    }

});