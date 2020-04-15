require("dotenv").config();

const express = require("express");
const sequelize = require("sequelize");
const app = express();
const fbApp = require("./config/fb-config");
const path = require("path");
const config = require("./config/config")
const db = require("./models");
const PORT = process.env.PORT || 3456;


// setting view port



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
