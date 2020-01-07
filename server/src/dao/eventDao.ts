const daoParentEvent = require('./dao.ts');
const EventVar = require('./Event.ts');

module.exports = class eventDao extends daoParentEvent {
    constructor(pool) {
        super(pool);
    }

    getAllEvents(callback) {
        super.query('SELECT * FROM event', [], callback);
    }

    getEvent(eventId : number, callback) {
        super.query('SELECT * FROM event WHERE event_id = ?', [eventId], callback);
    }

    getEventsByLocation(location : string, callback) {
        super.query('SELECT * FROM event WHERE location = ?', [location], callback);
    }

    getEventsByStatus(status : string, callback) {
        super.query('SELECT * FROM event WHERE status = ?', [status], callback);
    }

    getEventsByOrganizer(organizer : string, callback) {
        super.query('SELECT * FROM event WHERE organizer = ?', [organizer], callback);
    }

    addEvent(event, callback) {
        super.query('INSERT INTO event VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)', [event.name, event.organizer, event.location, event.fromDate, event.toDate, event.capacity, event.status], callback);
    }

    updateEvent(eventId : number, event, callback){
        super.query('UPDATE event SET name = ?, organizer = ?, location = ?, fromDate = ?, toDate = ?, capacity = ?, status = ? WHERE event_id = ?', [event.name, event.organizer, event.location, event.fromDate, event.toDate, event.capacity, event.status, eventId], callback);
    }
};
