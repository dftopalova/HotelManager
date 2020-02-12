const passport = require('passport');
const express = require('express');
const Admin = require("../models/admin");
const User = require("../models/user");
const Booking = require("../models/booking");
const Room = require("../models/room");

const adminRouter = express.Router();

adminRouter.get('/admin', function (req, res) {
  res.redirect('/admin/login'); // load the index file
});

// process the login form
// adminRouter.post('/login', do all our passport stuff here);
adminRouter.post('/admin/login', passport.authenticate('admin-login', {
  successRedirect: '/admin/menu', // redirect to the secure profile section
  failureRedirect: '/admin/login' // redirect back to the signup page if there is an error
}));

// get list of all rooms, only available for the admin
adminRouter.get('/rooms', (req, res, next) => {
  Room.find()
    .then(rooms => res.send(rooms))
    .catch(next)
});

// get room by id 
adminRouter.get('/rooms/:id', isLoggedIn, (req, res, next) => {
  Room.findOne({ _id: req.params.id })
    .then(room => res.send(room))
    .catch(next)
});

// admin make room reservation for user
adminRouter.post('/rooms/:id', isLoggedIn, async (req, res, next) => {
  const { firstName, lastName, email, phone, startDate, endDate, roomType } = req.body;

  let user = User.findOne({ _email: email });
  if (!user) {
    user = await User.create({ firstName: firstName, lastName: lastName, email: email, phone: phone });
    user.save()
  }
  Room.updateOne({_id: req.params.id}, {$set: {available: false, checkin: false, user: user}})
  .then((room) => {
  User.updateOne({ _id: user.id }, { $set: { roomNumber: room.number } })
  })
  .catch(next)
});

// admin checks in user in a concrete room
adminRouter.put("/checkin/room/:id", isLoggedIn, (req, res, next) => {
  Room.updateOne({_id: req.params.id}, {$set: {available: false, checkin: true, user: user}})
  .then((room) => {
    res.send(room)
  })
  .catch(next)
});

//admin checks out user from room
adminRouter.put("/checkout/room/:id", isLoggedIn, (req, res, next) => {
  //TODO
});

adminRouter.get('/admin/logout', isLoggedIn, function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/admin');
  });
});

// route middleware to make sure a admin is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/login');
}

module.exports = adminRouter;