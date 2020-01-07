const daoParentEvent = require('./dao.ts');
const EventVar = require('./Event.ts');

export interface event {
    event_id: number,
    organizer: string,
    name: string,
    address: string,
    from_date: string,
    to_date: string,
    capacity: number,
    status: string
}

export default class eventDao extends daoParentEvent {
    constructor(pool) {
        super(pool);
    }

    getAllEvents(callback) {
        super.query('SELECT * FROM event', [], callback);
    }

    getEvent(eventId : number, callback) {
        super.query('SELECT * FROM event WHERE event_id = ?', [eventId], callback);
    }

    getEventsByAddress(location : string, callback) {
        super.query('SELECT * FROM event WHERE adress = ?', [location], callback);
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

    updateEvent(eventId : number, data: event , callback){
        super.query('UPDATE event SET name = ?, organizer = ?, location = ?, fromDate = ?, toDate = ?, capacity = ?, status = ? WHERE event_id = ?',
            [data.name, data.organizer, data.address, data.from_date, data.to_date, data.capacity, data.status, eventId], callback);
    }
    deleteEvent(eventId : number,  callback){
        super.query('Delete * FROM event WHERE event_id = ?', [eventId], callback);
    }

    getEventsOfUser(userId : number, callback) {
        super.query('SELECT event.* FROM event, user_event WHERE user_event.user_id = ? AND event.event_id = user_event.event_id', [userId], callback)
    }
};
