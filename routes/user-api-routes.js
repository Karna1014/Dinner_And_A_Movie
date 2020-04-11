
const express = require("express");
const sequelize = require("sequelize");
const app = express();
const request = require("request");
var db = require("../models");
var moment = require("moment");
const nodemailer = require("nodemailer");
const login = require("../public/assets/js/login")
const firebase = require("firebase");
firebase.auth();

module.exports = function (app) {
  // let user = fb.currentUser;
    app.get("/", function (req, res) {
        res.render("login", {title: "Signin Page"});
    });

    app.get("/signup", function (req, res){
      res.render("signup", {title: "Signup Page"});
    });
  

    // goes to 
    app.get("/movie-dinner", function (req, res) {
        res.render("movie-dinner", {
          title: "Movie-Dinner",
          style: "movie-dinner.css"
        });
    });

    //POST route for new user
    app.post("/signup", function (req, res) {
        fb.createUserWithEmailAndPassword(req.body.email, req.body.pswd)
        .then((data) => {
          console.log(req.body);

          db.Users.create({
              displayName: req.body.displayName,
              email: req.body.email,  
              //genre: req.body.Genre,
              // dinner: req.body.Dinner,
              uid: req.body.uid,
              createdAt: Date.now()
          }).then(function (results) {
              res.send(results);
          })
      });
    });

    app.post("/login", function (req, res) {
      let user = fbApp.currentUser;
      console.log(user);
      fbApp.signInWithEmailAndPassword(req.body.email, req.body.pswd)
      .then((data) => {
        console.log(req.body);

        db.Users.findOne({
          where: {
              email: req.body.email
          }
        })
        }).then(function (results) {
            res.send(results);
        });
    });
  
    app.post("/movie-dinner", function(req, res){
      db.Movies.create({
        genre: req.body.genreId,
        dinner: req.body.dinner,  
        // dinner: req.body.Dinner,
        // uid: req.body.uid,
        createdAt: Date.now()
        }).then(function (results) {
        res.send(results);
       });
    })
  
    //search all users 
    app.get("/api/Users", function(req, res) {
      
      db.Users.findAll({
        include: [db.Movies]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  
  //delete one user
    app.delete("/api/Users/:id", function(req, res) {
      db.Users.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  
  
      //GET route for FB id (when existing user logs in)
       app.get("/current/:id", function (req, res) {
           db.Users.findOne({
                   where: {
                       id: req.params.id
                   },
                   include: [db.Movies]
               })
               .then(function (result) {
    
                   var genreId = result.genre;
                   var today = moment().format('YYYY-MM-DD');
                   var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;


                   request(queryURL, function (error, response, body) {
                      console.log('error:', error); // Print the error if one occurred
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      res.render("profile", JSON.parse(body));
                    });
               });
       });

       //POST route for nodemailer
       app.post("/email", function (req, res) {
            let recipient = req.body.email;

            db.Users.findOne({
                   where: {
                       email: recipient
                   },
                   include: [db.Movies]
               })
               .then(function (result) {
    
                   var genreId = result.genre;
                   var today = moment().format('YYYY-MM-DD');
                   var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=3d866c05691ba06f9fa697f8e8c9e838&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;

                   request(queryURL, function (error, response, body) {
                      console.log('error:', error); // Print the error if one occurred
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      var moviesBody = JSON.parse(body);
                      //var imgToEmail = "<img src="../public/assets/images/img1">";

                      console.log("Nodemailer sending to: " + recipient);

                      let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                          user:"yousue891@gmail.com",
                          pass: "Tha,bto7"
                        },
                        tls:{
                            rejectUnauthorized:false
                        }
                      });

                      let mailOptions = {
                        from: "yousue891@gmail.com",
                        replyTo: "youseu891@gmail.com",
                        to: recipient,
                        subject: "Here are the movies you requested!",
                        text: "'" + moviesBody.results[0].title + "', Release Date: " + moviesBody.results[0].release_date
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent');
                        };
                        
                      });

                      console.log("Movies successfully sent: " + moviesBody);

                      res.send(true);

                });

               });

            });
};
