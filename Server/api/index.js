const express = require("express");
const apiRouter = express.Router();

const userRouter = require('./users');
const userModel = require('../models/user');

const bookingRouter = require('./bookings');
const bookingModel = require('../models/booking');

const adminRouter = require('./admin');

apiRouter.post('/register', (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  userModel.create({ email, firstName, lastName, password })
    .then(createdUser => res.send(createdUser))
    .catch(next)
});


apiRouter.get('/', (req, res) => {
  res.send('Hotel Manager');
});

apiRouter.use('/users', userRouter);

apiRouter.use('/bookings', bookingRouter);

apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;