const request = require("request");
var db = require("../models");
var moment = require("moment");
const nodemailer = require("nodemailer");
//const firebase = require("firebase");
const fbApp = require("../config/fb-config");

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
    // var database = firebase.database();
    // var user = firebase.auth().currentUser;
    var email = req.body.email;
    var password = req.body.pswd;
    var displayName = req.body.displayName;
    // var uid = req.body.uid;
    // var uid;
    fbApp
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const uid = data.uid
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
    fbApp
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
    const user = fbApp.currentUser;
    if (user) {
      db.User.findOne({
        where: {
          email: user.email,
        },
      }).then(function(user) {
        db.Movie.findAll({
          where: user.id = db.Movie.UserId
        }).then(function(data) {
          
          //console.log(data);  
         moviesToReturn = [];
        for (var i = 0; i < data.length; i++) { 

            if (moviesToReturn.indexOf(data[data.length-1].dataValues.genreName) == -1) {
              
              
              moviesToReturn.push(data[data.length-1].dataValues.genreName);
            }
          }
          
            var hbsObject = {
              movies: moviesToReturn,
              //movies:movieList.genreName,
              email: user.email,
              displayName: user.displayName
          };
        
          res.render("dashboard", hbsObject);
        });
      })   
    }
  });

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
  // app.post("/api/", function(req,res){
  //     res.redirect("/dashboard");
  // });
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

  var queryURL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" + TMDB_API_KEY + "&language=en-US";

$.ajax({
  url: queryURL,
  method: "GET",
}).done(function (response) {
  var genres = response.genres;
  for (i = 0; i < genres.length; i++) {
    $("select").append(
      "<option value='" + genres[i].id + "'>" + genres[i].name + "</option>"
    );
  }
});

var queryLimit = 8;
var today = moment().format("YYYY-MM-DD");

//call movie api
$("#search").click(function () {
  event.preventDefault();
  $("#movieList").empty();
  var genreId = $("select").val();

  var queryURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" + TMDB_API_KEY + "&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" +
    today +
    "&with_genres=" +
    genreId;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).done(function (response) {
    var movies = response.results;

    for (i = 0; i < movies.length; i++) {
      var posterURL =
        "https://image.tmdb.org/t/p/w500/" + movies[i].poster_path;

      $("#movieList").append(
        "<ul style='list-style-type: none'><li>Movie ID: " +
          movies[i].id +
          "</li><li>Movie Title: " +
          movies[i].title +
          "</li><li>Release Date: " +
          movies[i].release_date +
          "</li><li> <img style='width: 300px; height: auto' src='" +
          posterURL +
          "'></li><li>Overview:<br>" +
          movies[i].overview +
          "</li></ul><hr>"
      );
    }
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

   //---------- Information for recipe calls and routes-------

var cardCount = 1;
var hr = $('<hr id="line">');
// On click function that will trigger the AJAX call to get recipes.
$("#find-recipe").on("click", function (event) {
  event.preventDefault();
  $("#recipe-view").empty();
  var header =
    "https://cors-anywhere.herokuapp.com/https://recipe-puppy.p.rapidapi.com/?p=1&i=";
  var i = $("#recipe-input").val().trim();
  var apikey = "&rapidapi-key=RP_API_KEY";
  var queryURLdin = header + i + apikey;
  console.log(queryURLdin);
  // AJAX call with parsed responses.
  $.ajax({
    url: queryURLdin,
    method: "GET",
  }).done(function (response) {
    console.log(response);
    var res = JSON.parse(response);
    res.results.forEach(function (item) {
      console.log(item);
      let i = cardCount;

      // HTML Elements to dynamically populate to page with items from the AJAX call.
      var recipeName = $('<h2 id="name" align="center">').text(item.title);
      var recipeURL = $('<a id="atag" target="_blank">')
        .attr("href", item.href)
        .append(recipeName);
      var ingred = $('<h4 id="ingred" align="center">').text(
        "Main Ingredients: " + item.ingredients
      );
      var image = $('<img id="image" align="middle">').attr(
        "src",
        item.thumbnail
      );
      var hr = $('<hr id="line">');
      // var btnSave = $('<input type="button" class="btnSave" name="btnSave" value="Saved Recipes">').addClass("btn btn-primary btn-lg").attr('id', cardCount++);
      // Appending all the information to the HTML file.
      $("#recipe-view").append(image, recipeURL, ingred, hr);
      console.log("Recipes Added.");
    });
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

 
  //Need to be fix minor connection issue
  app.get("/send", function(req, res){

    res.render("send", { title: "email Page" });
  });
  //POST route for nodemailer
  app.post("/send", function (req, res) {
    
     db.User.findOne({
      // var recipient =req.body.email;

       where: {
         email: req.body.email,
       },
       include: [db.Movie]
    }).then(function (result) {
      console.log(result);
      var genreId = result.genreId;
      var today = moment().format("YYYY-MM-DD");
       var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.TMDB_API_KEY + "&language=en-US&region=US&sort_by=release_date.asc&include_video=false&page=1&primary_release_date.gte=" + today + "&with_genres=" + genreId;

       request(queryURL, function (error, response, body) {
         console.log("error:", error); // Print the error if one occurred
         console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
         var moviesBody = JSON.parse(body);   
         var imgToEmail = " <img src='https://image.tmdb.org/t/p/w500/" + movies[i].poster_path; + "' />";     
        console.log("Nodemailer sending to: " + result.email);

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
           text: "'" + moviesBody.results[0].title + "', Release Date: " + moviesBody.results[0].release_date
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
 };
