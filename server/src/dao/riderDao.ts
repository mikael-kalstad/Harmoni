const daoParentRider = require('./dao.ts');
const Rider = require('./Rider.ts');

module.exports = class riderDao extends daoParentRider{
    constructor(pool){
        super(pool);
    }

    getAllRiders(callback) {
        super.query('SELECT * FROM rider', [], callback)
    }

    getRider(riderId: number, callback) {
        super.query('SELECT * FROM rider WHERE rider_id = ?', [riderId], callback);
    }

    addRider(rider, callback) {
        super.query('INSERT INTO rider VALUES(DEFAULT, ?)', [rider.text], callback);
    }

    updateRider(riderId: number, rider, callback) {
        super.quer('UPDATE rider SET text = ? WHERE riderId = ?', [rider.text], callback);
    }
}
