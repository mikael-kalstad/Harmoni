var mysql = require("mysql");

export const pool = mysql.createPool(
    {
        connectionLimit: 30,
        host: "mysql.stud.iie.ntnu.no",
        user: "mahmouim",
        password: "7jddp0FT",
        database: "mahmouim",
        debug: false,
        multipleStatements: true
    }
);