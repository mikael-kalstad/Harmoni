const dao = require('./dao.ts');
const Rider = require('./Rider.ts');

module.exports = class riderDao extends dao{
    constructor(pool){
        super(pool);
    }

    getRider(riderId: number, callback) {
        super.query('SELECT * FROM rider WHERE rider_id = ?', [riderId], callback);
    }
}
