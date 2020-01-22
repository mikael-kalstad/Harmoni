// Tests to interact with attachments.
import attachmentDao from "../dao/attachmentDao";

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

test("Get all attachments uploaded by userId", done => {
    dao.getAttachmentsForUploader(2, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].attachment_id).toBe(2);
        done();
    })
})

test("Get all attachments uploadad userId and eventID", done => {
    dao.getAttachmentsForUploaderForEvent(1,2, (status, data) => {
        expect(status).toBe(200);
        expect(data[0].attachment_id).toBe(1);
        done();
    })
})

// Add attachment 2 to user 1
// Attachment 2 is already related to event 1 and user 2
test("Add user for attachment", done => {
    dao.addUserForAttachment(2,1,(status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
    })
})

// Excepted to get two attachments
test("Get all attachments an user has access to", done => {
    dao.getAttachmentsForUser(1,(status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(2);
        done();
     })
})

// User1 has access to one attachment for event2
test("Get all attachments an user has access to for an event", done => {
    dao.getAttachmentsForUserForEvent(1,2,(status, data) => {
        expect(status).toBe(200);
        expect(data.length).toBe(1);
        done();
    })
})

test("Delete attachment for user", done => {
    dao.deleteAttachmentForUser(2,1,(status, data) => {
        expect(status).toBe(200);
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);
        done();
     })
})

test("Add attachment", done => {
    let attachment = 
    {
        data: "x'23B",
        filename: "testdata.txt",
        filetype: "document/txt",
        filesize: 100
    }
    let body = {
        event_id: 2,
        user_id: 2,
    }

    let data = {
        body: JSON.stringify(body),
        attachment: attachment
    }
    dao.addAttachmentForUserForEvent(data, (status, data) => {
        expect(status).toBe(200);
        expect(data.affectedRows).toBe(1);

        dao.getAttachmentsForUser(2, (status, data2) => {
            expect(status).toBe(200);
            expect(data2.filter(e => e.attachment_id == data.insertId).length).toBe(1);
            done();
        })
    })
})

test("Update attachment", done => {
    let input =
        {
            attachment_id: 3,
            event_id: 2,
            user_id: 2,
            data: "x'32A",
            filename: "testdata.txt",
            filetype: "document/txt",
            filesize: 100
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