import riderListDao, { riderList } from "../dao/riderListDao";

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

const dao = new riderListDao(conPool);

beforeAll(done => {
  run("src/tests/createTestDB.sql", conPool, () => {
    run("src/tests/createTestData.sql", conPool, done);
  });
});

afterAll(() => {
  conPool.end();
});

test("Get all rider_lists", done => {
  dao.getAllRiderLists((status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  });
});

test("Get rider_list by id", done => {
  dao.getRiderList(1, (status, data) => {
    expect(status).toBe(200);
    expect(data[0].text).toBe("5 pepsi max");
    expect(data.length).toBe(1);
    done();
  });
});

test("Get rider_lists by event id where rider_list exists", done => {
  dao.getRiderListByEventId(1, (status, data) => {
    expect(status).toBe(200);
    expect(data[0].text).toBe("5 pepsi max");
    expect(data.length).toBe(1);
    done();
  });
});

test("Get rider_lists by event id where rider_list does not exist", done => {
  dao.getRiderListByEventId(2, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(0);
    done();
  });
});

test("Get rider_list by user id in event", done => {
  dao.getRiderListByUserIdInEvent(1, 3, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].text).toBe("5 pepsi max");
    done();
  });
});

test("Add riderlist", done => {
  let newRiderList = {
    rider_list_id: -1,
    user_id: 5,
    event_id: 2,
    text: "780 shampoo bottles please"
  };

  dao.addRiderList(
    newRiderList.event_id,
    newRiderList.user_id,
    newRiderList.text,
    (status, data) => {
      expect(status).toBe(200);
      expect(data.affectedRows).toBe(1);
      done();
    }
  );
});

test("Update rider", done => {
  let updatedRiderList = {
    rider_list_id: 2,
    user_id: 5,
    event_id: 2,
    text: "780 shampoo bottles please"
  };
  dao.updateRiderList(
    updatedRiderList.rider_list_id,
    updatedRiderList,
    (status, data) => {
      expect(status).toBe(200);
      expect(data.affectedRows).toBe(1);
      expect(data.changedRows).toBe(1);
      done();
    }
  );
});

test("Delete rider", done => {
  dao.deleteRiderListById(2, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});
