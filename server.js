require("dotenv").config();

const express = require("express");
const sequelize = require("sequelize");
const app = express();
const fbApp = require("./config/fb-config");
const path = require("path");



// setting view port

var PORT = process.env.PORT || 8080;

var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
// =============================================================
//var routes = require("./routes/html-routes.js");

require("./routes/user-api-routes")(app);

// require("./routes/movie-api-routes.js")(app);
// require("./routes/dinner-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// { force: false, alter: true }
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

