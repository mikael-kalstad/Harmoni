import userDao from "../dao/userDao";
import {compareHash, hash} from "../hashing";
import { domainToASCII } from "url";

var mysql = require("mysql");
var fs = require("fs");

function run(filename, pool, done) {
    console.log("runsqlfile: reading file " + filename);
    let sql = fs.readFileSync(filename, "utf8");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting");
            done();
        } else {
            console.log("runsqlfile: connected");
            connection.query(sql, (err, rows) => {
                connection.release();
                if (err) {
                    console.log(err);
                    done();
                } else {
                    console.log("runsqlfile: run ok");
                    done();
                }
            });
        }
    });
};

let poolConfig = {
    connectionLimit: 1,
    host: process.env.NODE_ENV == "ci" ? "mysql" : "localhost",
    user: "root",
    password: "humbug",
    database: "harmoni",
    debug: false,
    multipleStatements: true
}

var conPool = mysql.createPool(poolConfig);

const dao = new userDao(conPool);


beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
})

test("Add user with password", done => {
    let password = "Passord"
    let pass = hash(password)
    let input ={
        user_id: -1,
        name: "Test Testesen",
        email: "test@login.com",
        mobile: 1881,
        hash: pass.hash,
        salt: pass.salt,
        type: "artist",
        picture: null
    }
    dao.addUser(input, (status, data) => {
        expect(status).toBe(200);
        expect(data.insertId).toBeGreaterThanOrEqual(5);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Check login for user with WRONG password", done => {
    let wrongPass = "blabla"
    dao.getHashOfUser("test@login.com", (status, data) =>{
        let user = data[0];
        let boolean = compareHash(user.hash, wrongPass, user.salt)
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(boolean).toBe(false)
        done();
    })
},3000)

test("Check login for user with CORRECT password", done => {
    let correctPass = "Passord"
    dao.getHashOfUser("test@login.com", (status, data) =>{
        let user = data[0];
        let boolean = compareHash(user.hash, correctPass, user.salt)
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(boolean).toBe(true);
        done();
    })
}, 3000)

test("Check if password is case sensitive", done => {
    let wrongPass = "passord"
    dao.getUserByEMail("test@login.com", (status, data) =>{
        let user = data[0];
        let boolean = compareHash(user.hash, wrongPass, user.salt)
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(boolean).toBe(false);
        done();
    })
}, 3000)



test("Test for change of password using CORRECT old password", done => {
    let pass = {oldPassword: "Passord", newPassword: "nyttPassord"};
    dao.changePassword("test@login.com", pass, (status, data) => {
        expect(status).toBe(200);
        done();
    })    
}, 3000)

/*
//Ikke ferdig da jeg ikke klarer å ta i bruk det som står i else-blokken i dao.changePassword
test("Test for change of password using WRONG old password", done => {
    let pass = {oldPassword: "feilPassord", newPassword: "nyestePassord"};
    dao.changePassword(5, pass, (status, data) => {
       // expect(status).toBe(200);
        done();
    })    
}, 5000)
*/
