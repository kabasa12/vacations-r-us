var mysql = require('mysql2');
var CLEARDB_DATABASE_URL = `mysql2://adffdadf2341:adf4234@us-cdbr-east.cleardb.com/heroku_db?reconnect=true`
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