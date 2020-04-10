// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();
var fbApp = require("../config/fb-config");
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

};

 
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
    res.render("dinner");
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