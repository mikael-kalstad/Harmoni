import eventDao from "../dao/eventDao";

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


var conPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "humbug",
    database: "harmoni",
    debug: false,
    multipleStatements: true
});

const dao = new eventDao(conPool);

beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});

//This is a test test
test("Test zero equal to zero", done => {
    expect(0).toBe(0);
    done();
});

test("Test zero NOT equal to one", done => {
    expect(0).not.toBe(1);
    done();
})

test("Get all events", done => {
    dao.getAllEvents((status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(2);
        done();
    })
})

test("Get event by id", done => {
    dao.getEvent(1, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].organizer).toBe(2);
        expect(data[0].capacity).toBe(1000);
        done();
    })
})

test("Get events by address", done => {
    dao.getEventsByAddress("Elgseter Gate 1", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data[0].organizer).toBe(3);
        expect(data[0].capacity).toBe(300);
        done();
    })
})

test("Get events by status", done => {
    dao.getEventsByStatus("kommende", (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(2);
        done();
    })
})

test("Get events by organizer", done => {
    dao.getEventsByOrganizer(2, (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        done();
    })
})

test("Add new event", done => {
    let event = 
    {
        event_id: -1,
        organizer: 2,
        name: "Awesome konsert!",
        address: "Fantasiveien 3",
        from_date: "2020-01-07 15:00:00",
        to_date: "2020-01-07 20:00:00",
        capacity: 10,
        status: "kommende"
    } 
    dao.addEvent(event, (status, data) => {
        expect(status).toBe(200);
        expect(data.insertId).toBe(3);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Update event", done => {
    let event = 
    {
        event_id: -1,
        organizer: 2,
        name: "Awesome konsert!",
        address: "Fantasiveien 3",
        from_date: "2020-01-07 15:00:00",
        to_date: "2020-01-07 20:00:00",
        capacity: 100,
        status: "kommende"
    } 
    //Actual change
    dao.updateEvent(3, event, (status, data) => {;
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        expect(data.changedRows).toBe(1);
    })

    //No change
    dao.updateEvent(3, event, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        expect(data.changedRows).toBe(0);
        done();
    })
})

test("Delete an event", done => {
    dao.deleteEvent(3, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Get all events for user", done => {
    dao.getEventsOfUser(3, (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        expect(data[0].event_id).toBe(1);
        done();
    })
})