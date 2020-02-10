const express = require('express');
const Admin = require("../models/admin");
const User = require("../models/user");
const Booking = require("../models/booking");

const adminRouter = express.Router();

  adminRouter.get('/admin', function(req, res) {
    res.redirect('/admin/login'); // load the index file
  });

  adminRouter.get('/admin/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('loginadmin'); 
  });

  // process the login form
  // adminRouter.post('/login', do all our passport stuff here);
  adminRouter.post('/admin/login', passport.authenticate('admin-login', {
    successRedirect : '/admin/menu', // redirect to the secure profile section
    failureRedirect : '/admin/login' // redirect back to the signup page if there is an error
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  adminRouter.get('/admin/signup', function(req, res) {
    res.render('adminsignup');
  });

  // process the signup form
  // adminRouter.post('/signup', do all our passport stuff here);
  adminRouter.post('/admin/signup', passport.authenticate('admin-signup', {
    successRedirect : '/admin/menu', // redirect to the secure profile section
    failureRedirect : '/admin/signup' // redirect back to the signup page if there is an error
  }));

  adminRouter.get('/admin/menu', isLoggedIn, function(req, res) {
    res.render('manager');
  });

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  adminRouter.get('/admin/rooms', isLoggedIn, function(req, res) {
    db.Room.findAll({}).then(function(result) {
      res.render("rooms", {
        rooms: result
      });
    });
  });

  adminRouter.post('/admin/rooms', isLoggedIn, function(req, res) {
    db.Guest.findAll({
      where: {
        last_name: req.body.name
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  adminRouter.get('/admin/rooms/id/:id', isLoggedIn, function(req, res) {
    db.Room.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Guest]
    }).then(function(result) {
      res.render("room", {
        rooms: result
      });
    });
  });

  adminRouter.get('/admin/book/id/:id', isLoggedIn, function(req, res) {
    db.Room.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.render("book-id", {rooms: result});
    });
  });

  adminRouter.post('/admin/book/id/:id', isLoggedIn, function(req, res) {
    db.Guest.create({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      room_number: req.body.room,
      checkin: req.body.checkin,
      checkout: req.body.checkout
    }).then(function(result1) {
      db.Room.update({
        GuestId: result1.dataValues.id,
        available: false
      }, {
        where: {
          id: req.body.room
        }
      }).then(function(result) {
        res.redirect("/admin/rooms/id/" + req.body.room);
      });
    });
  });

  adminRouter.put("/admin/checkin/id/:id", isLoggedIn, function(req, res) {
    db.Room.update({
      checkin: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.redirect("/admin/rooms/id/" + req.params.id);
    });
  });

  adminRouter.put("/admin/checkout/id/:id", isLoggedIn, function(req, res) {
    db.Guest.findOne({
      where: {
        room_number: req.params.id
      }
    }).then(function(result) {
      db.Room.update({
        available: true,
        checkin: false,
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(result2) {
        db.Guest.destroy({
          where: {
            id: result.dataValues.id
          }
        }).then(function(result3) {
          res.redirect("/admin/rooms/id/" + result.dataValues.room_number);
        });
      });
    });
  });

  //table view for manager
  adminRouter.get('/admin/tables', isLoggedIn, function(req, res) {
    db.Table.findAll({}).then(function(result) {
      res.render("tables-admin", {
        tables: result
      });
    });
  });

  adminRouter.post('/admin/tables-admin', isLoggedIn, function(req, res) {
    db.Table.findAll({
      where: {
        name: req.body.name
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  adminRouter.get('/admin/tables/id/:id', isLoggedIn, function(req, res) {
    db.Table.findAll({
      where: {
        id: req.params.id
      },
    }).then(function(result) {
      res.render("table", {
        tables: result
      });
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  adminRouter.get('/admin/logout', isLoggedIn, function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/admin');
    });
  });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/admin/login');
}