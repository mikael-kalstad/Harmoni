import userDao from "../dao/userDao";
import { doesNotReject } from "assert";

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
}

let poolConfig = {
  connectionLimit: 1,
  host: process.env.NODE_ENV == "ci" ? "mysql" : "localhost",
  user: "root",
  password: "humbug",
  database: "harmoni",
  debug: false,
  multipleStatements: true
};

var conPool = mysql.createPool(poolConfig);

const dao = new userDao(conPool);

beforeAll(done => {
  run("src/tests/createTestDB.sql", conPool, () => {
    run("src/tests/createTestData.sql", conPool, done);
  });
});

afterAll(() => {
  conPool.end();
});

test("Get all users", done => {
  dao.getAllUsers((status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(4);
    done();
  });
});

test("Get user by id", done => {
  dao.getUser(1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Hans Hansen");
    done();
  });
});

test("Get user by name", done => {
  dao.getUserByName("Hans Hansen", (status, data) => {
    expect(status).toBe(200);
    expect(data[0].email).toBe("hans@hansen.com");
    done();
  });
});

test("Get user by email", done => {
  dao.getUserByEMail("jens@jensen.com", (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Jens Jensen");
    done();
  });
});

test("Get all info of user by email", done => {
  dao.getUserAllInfoByEMail("jens@jensen.com", (status, data) => {
    expect(status).toBe(200);
    expect(data[0].type).toBe("artist");
    expect(data[0].hash).toBe("dfghjkfghjkfghjk");
    done();
  });
});

test("Get users by type, artist", done => {
  dao.getUsersOfType("artist", (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data.filter(user => user.type === "artist").length).toBe(1);
    done();
  });
});

test("Get users by type, volunteer", done => {
  dao.getUsersOfType("volunteer", (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data.filter(user => user.type === "volunteer").length).toBe(1);
    done();
  });
});

test("Get hash of user", done => {
  dao.getHashOfUser("hans@hansen.com", (status, data) => {
    let user = data[0];
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(user.hash).toBe("dfghjklfghj");
    expect(user.salt).toBe("fghjkfghjkh");
    done();
  });
});

test("Get organizer for event", done => {
  dao.getOrganizerForEvent(1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Roy Narvestad");
    done();
  });
});

test("Get artists for event", done => {
  dao.getArtistsForEvent(1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(1);
    expect(data[0].name).toBe("Jens Jensen");
    done();
  });
});

test("Get volunteers for event", done => {
  dao.getVolunteersForEvent(1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  });
});

test("Add user", done => {
  let user = {
    user_id: -1,
    name: "Test Testesen",
    email: "test@testesen.com",
    mobile: 1881,
    hash: "wgwrgwdgfqe",
    salt: "efnbvwwrtuj",
    type: "volunteer",
    picture: new Buffer("")
  };

  dao.addUser(user, (status, data) => {
    expect(status).toBe(200);
    expect(data.insertId).toBeGreaterThanOrEqual(5);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Get added user", done => {
  dao.getUser(5, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Test Testesen");
    done();
  });
});

test("Update user", done => {
  let updatedUser = {
    user_id: -1,
    name: "Test NyttTestNavn",
    email: "test@testesen.com",
    mobile: 113,
    hash: "wgwrgwdgfqe",
    salt: "efnbvwwrtuj",
    type: "volunteer",
    picture: new Buffer("")
  };
  // Actual change
  dao.updateUser(5, updatedUser, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    expect(data.changedRows).toBe(1);
    done();
    // No change
    dao.updateUser(5, updatedUser, (status, data) => {
      expect(status).toBe(200);
      expect(data.affectedRows).toBe(1);
      expect(data.changedRows).toBe(0);
      done();
    });
  });
});

test("Get updated user", done => {
  dao.getUser(5, (status, data) => {
    expect(status).toBe(200);
    expect(data[0].name).toBe("Test NyttTestNavn");
    done();
  });
});

test("Reset password of user", done => {
  let resetPasswordUser = {
    user_id: -1,
    name: null,
    email: null,
    mobile: -1,
    hash: "hashhashhash",
    salt: "saltsaltsalt",
    type: null,
    picture: null
  };
  dao.resetPassword("hans@hansen.com", resetPasswordUser, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
  });
});

test("Change password of user", done => {
  dao.changePassword(
    "jens@jensen.com",
    { newPassword: "NewPasswordTest" },
    (status, data) => {
      expect(status).toBe(200);
      expect(data.affectedRows).toBe(1);
    }
  );
});

test("Change picture of user", done => {
  dao.changePicture(1, "picturepicturepicturepicture", (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
  });
});

test("Delete user", done => {
  dao.deleteUser(5, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});
