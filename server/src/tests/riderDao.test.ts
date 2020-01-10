import riderDao, {rider, riderList} from "../dao/riderDao";

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

const dao = new riderDao(conPool);

beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});

test("Get all riders", done => {
    dao.getAllRiders((status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(6);
        done();
    })
})

test("Get rider by id", done => {
    dao.getRider(1, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].text).toBe("Julebrus");
        expect(data.length).toBe(1);
        done();
    })
})

test("Get rider by event id", done => {
    dao.getRiderByEventId(1, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].text).toBe("Julebrus");
        expect(data.length).toBe(1);
        done();
    })
})

test("Get rider by user id in event", done => {
    dao.getRiderByUserIdInEvent(1, 1, (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(0);
        done();
    })
})

test("Add rider", done => {
    let ridertest : rider = 
    {
        rider_id: -1,
        text: "Aass fatøl"
    }
    dao.addRider(ridertest, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Add rider list", done => {
    let riderList : riderList = 
    {
        rider_list_id: -1,
        user_id: 1,
        event_id: 1,
        rider_id: 1,
        quantity: 1
    }
    dao.addRiderList(riderList, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Update rider", done => {
    let rider = {
        rider_id: 6,
        text: "Sørlandschips"
    }
    dao.updateRider(6,rider, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        expect(data.changedRows).toBe(1);
        done();
    })
})  

test("Delete rider", done => {
    dao.deleteRider(6, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

