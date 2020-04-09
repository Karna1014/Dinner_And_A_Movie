// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();
var fbApp = require("../public/assets/js/fb-config");
// Routes
// =============================================================


 
// // // Each of the below routes just handles the HTML page that the user gets sent to.
// });
// index route loads login page
router.get("/", function(req, res) {
    console.log("route hit log");
  res.render("login", {});
});

router.get("/signup", function(req, res) {
  console.log("route hit sign");
  res.render("signup", {});
});

router.get("/dinner", function(req, res) {
  console.log("redirected");
  res.render("dinner", {});
});

router.post("/login", function(req, res) {
  console.log(req);
  fbApp.signInWithEmailAndPassword(req.body.Email, req.body.pswd)
  .then(data => {
    var user = fbApp.currentUser;
    console.log(user);
    res.redirect("/dinner", {user: user});
  })
  .catch(error => {
    console.log(error);
  })
});

router.post("/signup", function(req, res) {
  fbApp.createUserWithEmailAndPassword(req.body.email, req.body.pswd)
  .then(data => {
    var user = fbApp.currentUser;
      user.sendEmailVerification().then(function() {
      // Email sent.
      }).catch(function(error) {
      // An error happened.
      });
    res.redirect("/dinner");
  })
  .catch(error => {
    console.log(error);
  })

  res.redirect("/dinner");
});







module.exports = router;