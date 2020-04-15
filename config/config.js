//MySql connection
const mysql = require("mysql");

require("dotenv").config();

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
    console.log("Connected as id " + connection.threadId);
});

//Export connection for other file use




   
  module.exports = config;