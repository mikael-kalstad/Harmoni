const daoParentRider = require('./dao');

export interface riderList {
  rider_list_id: number;
  user_id: number;
  event_id: number;
  text:string;
}


export default class riderListDao extends daoParentRider {
  constructor(pool) {
    super(pool);
  }

  getAllRiderLists(callback) {
    super.query('SELECT * FROM rider_list', [], callback);
  }

  getRiderList(riderListId: number, callback) {
    super.query('SELECT * FROM rider_list WHERE rider_id = ?', [riderListId], callback);
  }

  getRiderListByEventId(eventId: number, callback) {
    super.query(
      'SELECT * FROM rider_list WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE event_id = ?)',
      [eventId],
      callback
    );
  }

  getRiderListByUserIdInEvent(eventId: number, userId: number, callback) {
    super.query(
      'SELECT * FROM rider_list WHERE rider_id IN (SELECT rider_id FROM rider_list WHERE (event_id = ? AND user_id = ?))',
      [eventId, userId],
      callback
    );
  }

  addRiderList(eventId:number,userId:number, text:string,  callback) {
    super.query(
      'INSERT INTO rider_list VALUES(DEFAULT, ?, ?,?)',
      [
        userId,
        eventId,
        text
      ],
      callback
    );
  }

  updateRiderList(riderList_id: number, text: string, callback) {
    super.query(
      'UPDATE rider_list SET text = ? WHERE riderList_id = ?',
      [text, riderList_id],
      callback
    );
  }

  deleteRiderListById(riderList_id: number, callback) {
    super.query('DELETE FROM rider_list WHERE rider_list_id = ?', [riderList_id], callback);
  }
}
