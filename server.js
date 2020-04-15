require("dotenv").config();

const express = require("express");
const sequelize = require("sequelize");
const app = express();
const fbApp = require("./config/fb-config");
const path = require("path");



// setting view port

var PORT = process.env.PORT || 8080;

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL) 
  } else {
  var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.SEQUELIZE_PASSWORD,
  database: 'movie_dinner'
  });
};
//make connection or pass error
connection.connect(function(err) {
  if (err) {
      console.error("Error Connecting: " + err.stack);
      return;
  }
});

//Export connection for other file use


var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory

app.use(express.static(path.join(__dirname, '/public')));

// Routes
// =============================================================


require("./routes/user-api-routes")(app);



// Syncing our sequelize models and then starting our Express app
// =============================================================
// { force: false, alter: true }
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
