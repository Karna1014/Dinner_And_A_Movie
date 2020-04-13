
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
  app.post("/api/signup", function (req, res) {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var email = req.body.email;
    var password = req.body.pswd;
    var displayName = req.body.displayName;
    var uid = req.body.uie;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        db.User.create({
          displayName: displayName,
          email: email,
        }).then(function (res) {
          console.log(res);
        });
      })
      .catch(function (error) {
        res.statusCode = 404;
      });
    res.redirect("/movie-dinner");
  });

  app.post("/api/authenticate", function (req, res) {
    firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.pswd)
      .then((data) => {
        res.json({ loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  });

  app.post("/api/movie-dinner", function (req, res) {
    var genreId = req.body.genreId;
    var genreName = req.body.genreName;
    db.Movie.create({
      genreId: genreId,
      genreName: genreName
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
//----------------------------------------------------------------------------------
/////////problem need to be fixed
  app.get("/dashboard", function (req, res) {
    const user = firebase.auth().currentUser;
    if (user) {
      console.log(user);
      db.User.findOne({
        where: {
          email: user.email,
        },
      })
        .then(function(user) {
          // console.log(dbRes.displayName);
          // res.render("movie-dinner", { displayName: dbRes.displayName });
          db.Movie.findOne({
            where: user.id = db.Movie.id
          })
        })
        .then(function(res){
          console.log(res);
          // var genreId = db.Movie.genreId;
          // res.redirect("movie-dinner");
          var genreId = res.Movie.genreId;
      var today = moment().format("YYYY-MM-DD");
      var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;

      request(queryURL, function (error, response, body) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        var moviesBody = JSON.parse(body);
        })
     })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    } else {
      res.redirect("/");
    };
  });

  //find all users
  app.get("/api/users", function(req, res) {
    
    db.User.findAll({
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/movies", function(req, res) {
    
    db.Movie.findAll({
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
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

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
    }).then(function(dbMovie) {
      res.json(dbMovie);
    });
  });

  // app.delete("/api/movies/:id", function(req, res) {
  //   db.Movie.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbMovie) {
  //     res.json(dbMovie);
  //   });
  // });
  
  //GET route for user id (when existing user logs in)
  app.get("/current/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (result) {
      var Genre = resul.genreId;
      var today = moment().format("YYYY-MM-DD");
      var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;

      request(queryURL, function (error, response, body) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        res.render("profile", JSON.parse(body));
      });
    });
  });

  //POST route for nodemailer
  app.post("/email", function (req, res) {
    let recipient = req.body.email;

    db.User.findOne({
      where: {
        email: recipient,
      },
    }).then(function (result) {
      var genreId = result.genreId;
      var today = moment().format("YYYY-MM-DD");
      var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;

      request(queryURL, function (error, response, body) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        var moviesBody = JSON.parse(body);
        //var imgToEmail = "<img src="../public/assets/images/img1">";

        console.log("Nodemailer sending to: " + recipient);

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "yousue891@gmail.com",
            pass: "Tha,bto7",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        let mailOptions = {
          from: "yousue891@gmail.com",
          replyTo: "youseu891@gmail.com",
          to: recipient,
          subject: "Here are the movies you requested!",
          text:
            "'" +
            moviesBody.results[0].title +
            "', Release Date: " +
            moviesBody.results[0].release_date,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent");
          }
        });

        console.log("Movies successfully sent: " + moviesBody);

        res.send(true);
      });
    });

    //GET route for FB id (when existing user logs in)
    app.get("/current/:id", function (req, res) {
      db.Users.findOne({
        where: {
          id: req.params.id,
        },
        include: [db.Movies],
      }).then(function (result) {
        var genreId = result.genreId;
        var today = moment().format("YYYY-MM-DD");
        var queryURL =
          "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" +
          today +
          "&with_genres=" +
          genreId;

        request(queryURL, function (error, response, body) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          res.render("profile", JSON.parse(body));
        });
      });
    });

    //POST route for nodemailer
    app.post("/email", function (req, res) {
      let recipient = req.body.email;

      db.Users.findOne({
        where: {
          email: recipient,
        },
        include: [db.Movies],
      }).then(function (result) {
        var genreId = result.genre;
        var today = moment().format("YYYY-MM-DD");
        var queryURL =
          "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" +
          today +
          "&with_genres=" +
          genreId;

        request(queryURL, function (error, response, body) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          var moviesBody = JSON.parse(body);
          //var imgToEmail = "<img src="../public/assets/images/img1">";

          console.log("Nodemailer sending to: " + recipient);

          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "yousue891@gmail.com",
              pass: "Tha,bto7",
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          let mailOptions = {
            from: "yousue891@gmail.com",
            replyTo: "youseu891@gmail.com",
            to: recipient,
            subject: "Here are the movies you requested!",
            text:
              "'" +
              moviesBody.results[0].title +
              "', Release Date: " +
              moviesBody.results[0].release_date,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent");
            }
          });

          console.log("Movies successfully sent: " + moviesBody);

          res.send(true);
        });
      });
    });
  });
};
