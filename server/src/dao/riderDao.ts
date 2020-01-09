const daoParentRider = require('./dao.ts');

export interface riderList {
  rider_list_id: number;
  user_id: number;
  event_id: number;
  rider_id: number;
  quantity: number;
}
export interface rider {
  rider_id: number;
  text: string;
}

export default class riderDao extends daoParentRider {
  constructor(pool) {
    super(pool);
  }

  getAllRiders(callback) {
    super.query('SELECT * FROM rider', [], callback);
  }

  getRider(riderId: number, callback) {
    super.query('SELECT * FROM rider WHERE rider_id = ?', [riderId], callback);
  }

  getRiderByEventId(eventId: number, callback) {
    super.query(
      'SELECT * FROM rider WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE event_id = ?)',
      [eventId],
      callback
    );
  }

  getRiderByUserIdInEvent(eventId: number, userId: number, callback) {
    super.query(
      'SELECT * FROM rider WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE (event_id = ? AND user_id = ?))',
      [eventId, userId],
      callback
    );
  }

  addRider(rider: rider, callback) {
    super.query('INSERT INTO rider VALUES(DEFAULT, ?)', [rider.text], callback);
  }

  addRiderList(riderList: riderList, callback) {
    super.query(
      'INSERT INTO rider_list VALUES(DEFAULT, ?, ?, ?, ?)',
      [
        riderList.user_id,
        riderList.event_id,
        riderList.rider_id,
        riderList.quantity
      ],
      callback
    );
  }

  updateRider(riderId: number, rider: rider, callback) {
    super.query(
      'UPDATE rider SET text = ? WHERE rider_id = ?',
      [rider.text, riderId],
      callback
    );
  }

  deleteRider(riderId: number, callback) {
    super.query('DELETE FROM rider WHERE rider_id = ?', [riderId], callback);
  }
  deleteRiderList(
    user_id: number,
    event_id: number,
    riderId: number,
    callback
  ) {
    super.query(
      'DELETE FROM rider WHERE riderId=? AND user_id=? AND event_id=?',
      [riderId, user_id, event_id],
      callback
    );
  }
}
