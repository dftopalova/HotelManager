const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
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

    password: {
        type: String,
        minlength: [3, 'Password should be at least 3 symbols!']
    },

    isAdmin: {
        type: Boolean,
        default: true,
    }

});


adminSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
    },

    checkIsAdmin: function () {
        return this.isAdmin;
    }
};

module.exports = mongoose.model('Admin', adminSchema);