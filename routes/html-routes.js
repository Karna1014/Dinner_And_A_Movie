// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var fbApp = require("../config/fb-config");
// Routes
// =============================================================
module.exports = function(app) {


  // $("#enroll").on("click", (event) => {
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  //   event.preventDefault();
  // // Each of the below routes just handles the HTML page that the user gets sent to.
  // });
  // index route loads view.html
  app.get("/", function(req, res) {
      console.log("route hit");
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/signup", function(req, res) {
    console.log("route hit");
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    fbApp.signInWithEmailAndPassword("test@test.com", "passworlk")
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    })
  });

  // blog route loads blog.html
  app.get("/success", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/success.html"));
  });


  };