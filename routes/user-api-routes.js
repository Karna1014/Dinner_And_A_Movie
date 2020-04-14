

const express = require("express");
const sequelize = require("sequelize");
const request = require("request");
var db = require("../models");
var moment = require("moment");
const nodemailer = require("nodemailer");
const firebase = require("firebase");

module.exports = function (app) {
  app.get("/signup", function (req, res) {
    res.render("signup", { title: "Signup Page" });
  });

  // goes to
  app.get("/movie-dinner", function (req, res) {
    res.render("movie-dinner", {
      title: "Movie-Dinner"
    });
  });

  // POST route for new user
  app.post("/signup", function (req, res) {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var email = req.body.email;
    var password = req.body.pswd;
    var displayName = req.body.displayName;
    var uid = req.body.uid;
    var uid;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        uid = data.uid
        db.User.create({
          displayName: displayName,
          email: email,
        }).then(function (dbUser) {
          console.log(dbUser);
          res.json({loggedInUser: dbUser.displayName, loggedInUserId: dbUser.id});
        });
      })
      .catch(function (error) {
        res.statusCode = 404;
      });
     // res.redirect("/movie-dinner");
  });

  app.post("/api/authenticate", function (req, res) {
    console.log(req.body.email, req.body.pswd)
    firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.pswd)
      .then((data) => {
        console.log(data)
        
        db.User.findOne({
          where: {
           email: req.body.email
          },
          }).then(function(dbUser) {
           res.json({loggedIn: true, loggedInUser: dbUser["dataValues"]["displayName"], loggedInUserId: dbUser["dataValues"]["id"]});
          }).catch((err) => {
            console.log(err);
            res.json({loggedIn: true, loggedInUser: null, loggedInUserId: null});
          });
      })
      .catch((err) => {
        res.json({loggedIn: false});
      });
  });

  app.get("/dashboard", function(req,res) {
    const user = firebase.auth().currentUser;
    if (user) {
      db.User.findOne({
        where: {
          email: user.email,
        },
      }).then(function(user) {
        db.Movie.findAll({
          where: user.id = db.Movie.UserId
        }).then(function(data) {
          
          moviesToReturn = [];
          for (var i = 0; i < data.length; i++) {
            if (moviesToReturn.indexOf(data[i].dataValues.genreName) == -1) {
              moviesToReturn.push(data[i].dataValues.genreName);
            }
          }
          
            var hbsObject = {
              movies: moviesToReturn,
              email: user.email,
              displayName: user.displayName
          };

          res.render("dashboard", hbsObject);
        });
      });
    }
  })

  app.post("/movie-dinner", function (req, res) {
  var genreId = req.body.genreId;
  var genreName = req.body.genreName;
  var userId = req.body.userId;

  db.Movie.create({
  genreId: genreId,
  genreName: genreName,
  UserId: parseInt(userId)
   }).then(function (res) {
  console.log(res);
  });
  });

  app.get("/", function (req, res) {
    res.render("login", { title: "Signin Page" });
  });

//---------------------------------------------------------------------------------
  app.post("/api/", function(req,res){
      res.redirect("/dashboard");
  });
//
  //find all users
  app.get("/api/users", function(req, res) {
    
    db.User.findAll({
      include: [db.Movie]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/movies", function(req, res) {
    
    db.Movie.findAll({
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //find user by Id
  app.get("/api/users/:id", function(req, res) {
   db.User.findOne({
     where: {
      id: req.params.id
     },
     include: [db.Movie]
     }).then(function(dbUser) {
      res.json(dbUser);
     });
  });
// leave lines 150 -159 commented out
  // app.delete("/api/users/:id", function(req, res) {
  //   db.User.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbUser) {
  //     res.json(dbuser);
  //   });
  // });

  app.get("/api/movies/:id", function(req, res) {
   db.Movie.findOne({
       where: {
         id: req.params.id
       },
       include: [db.User]
     }).then(function(dbMovie) {
       res.json(dbMovie);
    });
   });
// leave lines 170 -178 commented out
  // app.delete("/api/movies/:id", function(req, res) {
  //   db.Movie.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbMovie) {
  //     res.json(dbMovie);
  //   });
  // });
  

  // GET route for user id (when existing user logs in)
 

  // app.get("/email", function(req, res)
  //   res.render("email", { title: "email Page" });
   
  //POST route for nodemailer
  }