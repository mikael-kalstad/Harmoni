import ticketDao, { ticket } from "../dao/ticketDao";

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

const dao = new ticketDao(conPool);


beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});


test("Get all tickets", done => {
    dao.getAllTickets((status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(3);
        done();
    })
})

test("Get ticket by eventid", done => {
    dao.getTicketsByEventId(2, (status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(2);
        expect(data[0].price).toBe(500);
        expect(data[1].ticket_id).toBe(3);
        done();
    })
})

test("Add new ticket", done => {
    let ticket : ticket = {
        ticket_id : -1,
        event_id : 2,
        price : 500,
        type : "vip"
    }
    dao.addTicket(ticket, (status, data) => {
        expect(status).toBe(200);
        expect(data.insertId).toBe(4);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Delete one ticket", done => {
    dao.deleteTicket(4, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Delete ALL tickets from event", done => {
    dao.deleteAllTicketsForEvent(2, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(2);
        done();
    })
})