import attachmentDao from "../dao/attachmentDao";

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

const dao = new attachmentDao(conPool);

beforeAll(done => {
    run("src/tests/createTestDB.sql", conPool, () => {
        run("src/tests/createTestData.sql", conPool, done);
    })
})

afterAll(() => {
    conPool.end();
});

test("Get all attachments by eventId", done => {
    dao.getAttachmentsForEvent(1, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].attachment_id).toBe(2);
        done();
    })
})

test("Get all attachments by userId", done => {
    dao.getAttachmentsForUser(2, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].attachment_id).toBe(2);
        done();
    })
})

test("Get all attachments by eventId and userID", done => {
    dao.getAttachmentsForUserForEvent(1,2, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].attachment_id).toBe(1);
        done();
    })
})

test("Add attachment", done => {
    let input = 
    {
        attachment_id: 3,
        event_id: 2,
        user_id: 2,
        data: "x'23B"
    }
    dao.addAttachmentForUserForEvent(input, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

test("Update attachment", done => {
    let input =
        {
            attachment_id: 3,
            event_id: 2,
            user_id: 2,
            data: "x'32A"
        }
    //Actual change
    dao.updateAttachment(input, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        expect(data.changedRows).toBe(1);

        //No change
        dao.updateAttachment( input, (status, data) => {
            expect(status).toBe(200);
            expect(data.affectedRows).toBe(1);
            expect(data.changedRows).toBe(0);
            done();
        })
    })
})

test("Delete an attachment", done => {
    dao.deleteAttachment(1, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})