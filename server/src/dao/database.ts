// database-class sets up mySql username, password..
require('dotenv').config();
var mysql = require("mysql");

export const pool = mysql.createPool(
    {
        connectionLimit: 30,
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_database,
        debug: false,
        multipleStatements: true
    }
);