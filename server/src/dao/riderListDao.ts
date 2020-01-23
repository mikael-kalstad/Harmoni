/**
 * The attachmentDao-class is used to do everything has to do with
 * RiderList such get,create update...
 */
const daoParentRider = require("./dao");

export interface riderList {
  rider_list_id: number;
  user_id: number;
  event_id: number;
  text: string;
}

export default class riderListDao extends daoParentRider {
  constructor(pool) {
    super(pool);
  }

  getAllRiderLists(callback) {
    super.query("SELECT * FROM rider_list", [], callback);
  }

  getRiderList(riderListId: number, callback) {
    super.query(
      "SELECT * FROM rider_list WHERE rider_list_id = ?",
      [riderListId],
      callback
    );
  }

  // Gets all riderLists of specific event
  getRiderListByEventId(eventId: number, callback) {
    super.query(
      "SELECT * FROM rider_list WHERE event_id = ?;",
      [eventId],
      callback
    );
  }

  // Gets riderList given eventId,userId
  getRiderListByUserIdInEvent(eventId: number, userId: number, callback) {
    super.query(
      "SELECT * FROM rider_list WHERE event_id = ? and user_id = ?;",
      [eventId, userId],
      callback
    );
  }

  addRiderList(eventId: number, userId: number, text: string, callback) {
    super.query(
      "INSERT INTO rider_list VALUES(DEFAULT, ?, ?,?)",
      [userId, eventId, text],
      callback
    );
  }

  // Update riderList given its id and the incoming text
  updateRiderList(riderId: number, data: riderList, callback) {
    super.query(
      "UPDATE rider_list SET user_id = ?, event_id = ?, text = ? WHERE rider_list_id = ? ;",
      [data.userId, data.eventId, data.text, riderId],
      callback
    );
  }

  // Delete riderList given its id
  deleteRiderListById(riderList_id: number, callback) {
    super.query(
      "DELETE FROM rider_list WHERE rider_list_id = ?",
      [riderList_id],
      callback
    );
  }
}
