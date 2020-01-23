/**
 * Dao is superclass that sets up a connection pool,
 * and it's used to get a connection from the connection pool
 * instead of writing the same method in every single query
 */
module.exports = class Dao {
  pool;
  constructor(pool) {
    this.pool = pool;
  }
  query(sql: string, params: any[], callback: Function) {
    this.pool.getConnection((err, connection) => {

      if (err) {

        callback(500, { error: 'error when connecting' });
      } else {

        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {

            callback(500, { error: 'error querying' });
          } else {

            callback(200, rows);
          }
        });
      }
    });
  }
};
