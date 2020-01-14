module.exports = class Dao{
    pool;
    constructor(pool){
        this.pool = pool;
    }
    query(sql: string, params: any[], callback: Function) {
        this.pool.getConnection((err, connection) => {
          console.log('dao: trying to connect');
          if (err) {
            console.log('dao: error connecting');
            callback(500, { error: 'error when connecting' });
          } else {
            //console.log('dao: running sql: ' + sql);
            connection.query(sql, params, (err, rows) => {
              connection.release();
              if (err) {
                console.log(err);
                callback(500, { error: 'error querying' });
              } else {
                console.log('dao: returning rows');
                callback(200, rows);
              }
            });
          }
        });
      }
};
