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

    getRiderByEventId(eventId: number, callback){
        super.query('SELECT * FROM rider WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE event_id = ?)', [eventId], callback);
    }

    getRiderByUserIdInEvent(eventId: number, userId: number, callback){
        super.query('SELECT * FROM rider WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE (event_id = ? AND user_id = ?))', [eventId, userId], callback);
    }

    addRider(rider, callback) {
        super.query('INSERT INTO rider VALUES(DEFAULT, ?)', [rider.text], callback);
    }

    addRiderList(user_id : number, event_id : number, rider_list, riderId : number, callback){
        super.query('INSERT INTO rider_list VALUES(DEFAULT, ?, ?, ?, ?) WHERE rider_id = ?', [user_id, event_id, riderId, rider_list.quantity, riderId], callback);
    }

    updateRider(riderId: number, rider, callback) {
        super.query('UPDATE rider SET text = ? WHERE riderId = ?', [rider.text], callback);
    }
}
