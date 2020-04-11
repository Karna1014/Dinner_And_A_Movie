
//require("dotenv").config();
const express = require("express");
const sequelize = require("sequelize");
const app = express();
const request = require("request");
var db = require("../models");
var moment = require("moment");
const nodemailer = require("nodemailer");
const firebase = require("firebase");

module.exports = function (app) {
 
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

    // POST route for new user
    app.post("/signup", function (req, res) {
        var database = firebase.database();
        var user = firebase.auth().currentUser
        var email = req.body.email;
        var password = req.body.pswd; 
        var displayName = req.body.displayName;
        var uid = req.body.uid;
       firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
          var newPostRef = postListRef.push();
          newPostRef.set({
              // ...
          });
        })
        .catch(function(error) {
          res.statusCode = 404; 
         })
         res.redirect("/");
        });
      

    app.post("/login", function (req, res) {
      var user = firebase.auth().currentUser
      // console.log(user);
     firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.pswd)
      .then((data) => {
        console.log(req.body);

        // db.Users.findOne({
        //   where: {
        //       email: req.body.email
        //   }
        // })
        }).then(function (results) {
          if (user != null) {
            user.providerData.forEach(function (profile) {
              db.Users("displayName: " + profile.displayName);
              console.log("Email: " + profile.email);
            });
          }
            res.redirect("movie-dinner");
        });
    });
  

      //GET route for MYSQL id (when new user is created)
       app.get("/new/:id", function (req, res) {
           db.Users.findOne({
                   where: {
                       id: req.params.id
                   }
               })
               .then(function (resultGenre) {

                   var Genre = resultGenre.Genre;
                  // api_key=6bd7be41a26f54fd1b16437cf9ecfe5a;
                   var today = moment().format('YYYY-MM-DD');
                   var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=6bd7be41a26f54fd1b16437cf9ecfe5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=" + today + "&vote_average.gte=6&with_genres" + Genre;


                   request(queryURL, function (error, response, body) {
                      console.log('error:', error); // Print the error if one occurred
                      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      res.render("profile", JSON.parse(body));
                    });
               });
       });

      //GET route for FB id (when existing user logs in)
       app.get("/current/:id", function (req, res) {
           db.Users.findOne({
                   where: {
                       id: req.params.id
                   }
               })
               .then(function (result) {
    
                   var Genre = resultGenre.Genre;
                   var today = moment().format('YYYY-MM-DD');
                   var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=6bd7be41a26f54fd1b16437cf9ecfe5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=" + today + "&vote_average.gte=6&with_genres" + Genre;


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
                   }
               })
               .then(function (result) {
    
                   var Genre = resultGenre.Genre;
                   var today = moment().format('YYYY-MM-DD');
                   var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=6bd7be41a26f54fd1b16437cf9ecfe5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=" + today + "&vote_average.gte=6&with_genres=" + Genre;

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