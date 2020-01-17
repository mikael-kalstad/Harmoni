const daoParentEvent = require('./dao');

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
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event',
      [],
      callback
    );
  }

  getEvent(eventId: number, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE event_id = ?',
      [eventId],
      callback
    );
  }

  getEventsByAddress(location: string, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE address = ?',
      [location],
      callback
    );
  }

  getEventsByCapacity(capacity: number, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE capacity = ?',
      [capacity],
      callback
    );
  }

  getEventsByOrganizer(organizer: number, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE organizer = ?',
      [organizer],
      callback
    );
  }

  getEventsByStatus(status: number, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE status = ?',
      [status],
      callback
    );
  }

  getEventsByCategory(category: string, callback) {
    super.query(
      'SELECT event_id, organizer, name, address, capacity, ' +
        'status, information, category, picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event WHERE category = ?',
      [category],
      callback
    );
  }

  addEvent(event: event, callback) {
    super.query(
      'INSERT INTO event VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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

  addUserToEvent(userId: number, eventId: number, callback) {
    super.query(
      'INSERT INTO user_event VALUES(?, ?)',
      [userId, eventId],
      callback
    );
  }

  removeUserFromEvent(userId: number, eventId: number, callback) {
    super.query(
      'DELETE FROM user_event WHERE user_id=? AND event_id=?',
      [userId, eventId],
      callback
    );
  }
  getUsersOfEventByType(eventId:number,type:string, callback){
      super.query('SELECT DISTINCT user_event.user_id FROM user_event, user where user.type=? AND user_event.event_id=?',
          [type,eventId],
          callback);
  }

  updateEvent(eventId: number, data: event, callback) {
    super.query(
      'UPDATE event SET name = ?, organizer = ?, address = ?, from_date = ?, to_date = ?, capacity = ?, status = ?, information = ?, category = ?, picture = ? WHERE event_id = ?',
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
    super.query('DELETE FROM event WHERE event_id = ?', [eventId], callback);
  }

  getEventsOfUser(userId: number, callback) {
    super.query(
      'SELECT event.event_id, event.organizer, event.name, event.address, event.capacity, ' +
        'event.status, event.information, event.category, event.picture, ' +
        'DATE_FORMAT(to_date, "%d.%m.%Y %H:%i") as to_date, ' +
        'DATE_FORMAT(from_date, "%d.%m.%Y %H:%i") as from_date ' +
        'FROM event' +
        ', user_event WHERE user_event.user_id = ? AND event.event_id = user_event.event_id',
      [userId],
      callback
    );
  }
  changeStatus(eventId:number,status:string,callback){
      super.query('UPDATE event SET status=? WHERE event_id=?',[status,eventId],callback);
  }
}
