const mysql = require('mysql');
const util = require('util')
//var CLEARDB_DATABASE_URL = `mysql2://adffdadf2341:adf4234@us-cdbr-east.cleardb.com/heroku_db?reconnect=true`
var con = mysql.createConnection(
    //process.env.CLEARDB_DATABASE_URL ||
    {
        host:"us-cdbr-east-02.cleardb.com",
        user:"b605f8a24cff8a",
        password:"45ccbac3",
        database:"heroku_8b29697fa2873d3"
}
);

con.connect((err) => {
    if(err)throw err;
    console.log("connected")
})
const query = util.promisify(con.query).bind(con)

module.exports = query;
//.promise();