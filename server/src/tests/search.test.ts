import searchDao from "../dao/searchDao";

var mysql = require("mysql");
var fs = require("fs");

function run(filename, pool, done) {
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

const dao = new searchDao(conPool);

beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});

test("search for events given input as an address", done => {
    dao.searchForEvents("Elgseter Gate 1", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data[0].organizer).toBe(1);
        expect(data[0].capacity).toBe(300);
        done();
    })
})

test("search for events given organizer ", done => {
    dao.searchForEvents("jens jensen", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data[0].address).toBe("Elgseter Gate 1");
        done();
    })
})

test("search for events given organizer NR2 ", done => {
    dao.searchForEvents("Roy narvestad", (status, data) => {
        console.log("Forventer Roy narvestad: ", data);
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        done();
    })
})

test("search for events given one word in its information ", done => {
    dao.searchForEvents("kjøp", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data[0].category).toBe("festival");
        done();
    })
})