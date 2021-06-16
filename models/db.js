const mysql = require("mysql");
const dbconfig = require("config")

// Create a connection to the database
const connection = mysql.createPool({
  connectionLimit : 10,
  host: dbconfig.get("dbHost"),
  user: dbconfig.get("dbUser"),
  password: dbconfig.get("dbPassword"),
  database: dbconfig.get("dbDatabase")
});

module.exports = connection;