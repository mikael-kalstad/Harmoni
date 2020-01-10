import searchDao from "../dao/searchDao";

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

const dao = new searchDao(conPool);

beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});

test("search for events given input as an address", async () => {
    await new Promise(resolve => setTimeout(resolve, 20000));
    dao.searchForEvents("Elgseter Gate 1", (status, data) => {
        expect(status).toBe(200);
        console.log("hei", data)
        expect(data.length).toBe(1);
        expect(data[0].organizer).toBe(1);
        expect(data[0].capacity).toBe(300);
        //done();
    })
})

/*test("search for events given organizer ", done => {
    dao.searchForEvents("hans hansen", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(2);
        expect(data[0].address).toBe("Nordpolen");
        done();
    })
})

test("search for events given organizer NR2 ", done => {
    dao.searchForEvents("Roy narvestad", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data.status).toBe("kommende");
        done();
    })
})

test("search for events given one word in its information ", done => {
    dao.searchForEvents("kjøp", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data.category).toBe("festival");
        done();
    })
})*/