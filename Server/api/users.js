const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

// get all users
userRouter.get('/', (req, res, next) => {
    User.find()
        .then(users => res.send(users))
        .catch(next);
});

//get one user
userRouter.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
});

//create user
userRouter.post('/', (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    User.create({ email, firstName, lastName, password })
        .then(createdUser => res.send(createdUser))
        .catch(next);
});

//update user
userRouter.put('/:id', (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    User.updateOne({ _id: req.params.id }, { email, firstName, lastName, password })
        .then(updatedUser => res.send(updatedUser))
        .catch(next);
});

//delete user
userRouter.delete('/:id', (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(deleted => res.send(deleted))
        .catch(next);
});

// get all user's bookings
userRouter.get('/:id/bookings', (req, res, next) => {
    User.findById(req.params.id)
        .populate('bookings',)
        .then(bookings => res.send(bookings))
        .catch(next);
})

module.exports = userRouter;