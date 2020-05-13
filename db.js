var mysql = require("mysql");
//Database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'new_schema',
    });

connection.connect(function(error) {
    if (error) throw error;
    else console.log("Data base connected")
});
module.exports = connection;
