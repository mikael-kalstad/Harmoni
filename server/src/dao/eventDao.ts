/**
 * The attachmentDao-class is used to do everything has to do with
 * event such get,create update...
 */
const daoParentEvent = require("./dao");

export interface event {
  event_id: number;
  organizer: number;
  name: string;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: number;
  information: string;
  category: string;
  picture: string;
}

export default class eventDao extends daoParentEvent {
  constructor(pool) {
    super(pool);
  }

  getAllEvents(callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event ORDER BY from_date DESC LIMIT 20",
      [],
      callback
    );
  }

  // Get the last 20 uploaded events using Offset to load 20 more if more clicked
  getAllEventsWithOffset(offset: number, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE status != 2 AND event.to_date > NOW() ORDER BY event.from_date ASC LIMIT 20 OFFSET ?",
      [offset],
      callback
    );
  }

  getCountOfAllEventsNotCancelledNotFinished(callback) {
    super.query(
      "SELECT COUNT(*) as 'count' FROM event WHERE status != 2 AND to_date > NOW()",
      [],
      callback
    );
  }

  getEvent(eventId: number, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE event_id = ?",
      [eventId],
      callback
    );
  }

  // Get singular event given location
  getEventsByAddress(location: string, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE address = ?",
      [location],
      callback
    );
  }

  // Get singular event given organizerId
  getEventsByOrganizer(organizer: number, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE organizer = ?",
      [organizer],
      callback
    );
  }

  // Get singular event given status
  getEventsByStatus(status: number, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE status = ?",
      [status],
      callback
    );
  }

  // Get singular event given category, used to sort events in front-end
  getEventsByCategory(category: string, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE category = ?",
      [category],
      callback
    );
  }

  getEventsByCategoryWithOffset(category: string, offset: number, callback) {
    super.query(
      "SELECT event_id, organizer, name, address, capacity, " +
        "status, information, category, picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event WHERE category = ? AND status != 2 AND event.to_date > NOW() ORDER BY event.from_date ASC LIMIT 20 OFFSET ?",
      [category, offset],
      callback
    );
  }

  // Get upcoming events
  getCountOfEventsByCategoryNotCancelledNotFinished(
    category: string,
    callback
  ) {
    super.query(
      "SELECT COUNT(*) as 'count' FROM event WHERE category = ? AND status != 2 AND to_date > NOW()",
      [category],
      callback
    );
  }

  // Create event
  addEvent(event: event, callback) {
    super.query(
      "INSERT INTO event VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        event.organizer,
        event.name,
        event.address,
        event.from_date,
        event.to_date,
        event.capacity,
        event.status,
        event.information,
        event.category,
        event.picture
      ],
      callback
    );
  }

  // Used to connect users to specific event
  addUserToEvent(userId: number, eventId: number, callback) {
    super.query(
      "INSERT INTO user_event VALUES(?, ?)",
      [userId, eventId],
      callback
    );
  }

  getUserEvent(userId: number, eventId: number, callback) {
    super.query(
      "SELECT * from user_event WHERE user_id=? AND event_id=?",
      [userId, eventId],
      callback
    );
  }

  // Delete user from event
  deleteUserFromEvent(userId: number, eventId: number, callback) {
    super.query(
      "DELETE FROM user_event WHERE user_id=? AND event_id=?",
      [userId, eventId],
      callback
    );
  }

  // Gets users of specific event given user type and eventId
  getUsersOfEventByType(eventId: number, type: string, callback) {
    super.query(
      "SELECT DISTINCT user_event.user_id FROM user_event, user where user.type=? AND user_event.event_id=?",
      [type, eventId],
      callback
    );
  }

  updateEvent(eventId: number, data: event, callback) {
    super.query(
      "UPDATE event SET name = ?, organizer = ?, address = ?, from_date = ?, to_date = ?, capacity = ?, status = ?, information = ?, category = ?, picture = ? WHERE event_id = ?",
      [
        data.name,
        data.organizer,
        data.address,
        data.from_date,
        data.to_date,
        data.capacity,
        data.status,
        data.information,
        data.category,
        data.picture,
        eventId
      ],
      callback
    );
  }
  deleteEvent(eventId: number, callback) {
    super.query("DELETE FROM event WHERE event_id = ?", [eventId], callback);
  }

  // Gets all events of specific user given userId
  getEventsOfUser(userId: number, callback) {
    super.query(
      "SELECT event.event_id, event.organizer, event.name, event.address, event.capacity, " +
        "event.status, event.information, event.category, event.picture, " +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        "FROM event" +
        ", user_event WHERE user_event.user_id = ? AND event.event_id = user_event.event_id",
      [userId],
      callback
    );
  }

  // Changes status of singular event given eventId, used to archive/cancel event
  changeStatus(eventId: number, status: string, callback) {
    super.query(
      "UPDATE event SET status=? WHERE event_id=?",
      [status, eventId],
      callback
    );
  }
}
