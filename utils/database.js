var mysql = require('mysql2');
var CLEARDB_DATABASE_URL = "mysql2://b605f8a24cff8a:45ccbac3@us-cdbr-east-02.cleardb.com/heroku_8b29697fa2873d3?reconnect=true"
var con = mysql.createConnection(
    CLEARDB_DATABASE_URL 
//     {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "vacation_db"
// }
);

module.exports = con.promise();