const daoParentEvent = require('./dao.ts');

export interface event {
    event_id: number,
    organizer: number,
    name: string,
    address: string,
    from_date: string,
    to_date: string,
    capacity: number,
    status: string,
    information: string,
    category: string,
    picture: string
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
        super.query('SELECT * FROM event WHERE address = ?', [location], callback);
    }

    getEventsByCapacity(capacity : number, callback) {
        super.query('SELECT * FROM event WHERE capacity = ?', [capacity], callback);
    }

    getEventsByOrganizer(organizer : number, callback) {
        super.query('SELECT * FROM event WHERE organizer = ?', [organizer], callback);
    }

    getEventsByStatus(status : string, callback) {
        super.query('SELECT * FROM event WHERE status = ?', [status], callback);
    }

    getEventsByCategory(category : string, callback) {
        super.query('SELECT * FROM event WHERE category = ?', [category], callback);
    }

    addEvent(event : event, callback) {
        super.query('INSERT INTO event VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [event.organizer, event.name, event.address, event.from_date, event.to_date, event.capacity, event.status, event.information, event.category, event.picture], callback);
    }

    updateEvent(eventId : number, data: event , callback){
        super.query('UPDATE event SET name = ?, organizer = ?, address = ?, from_date = ?, to_date = ?, capacity = ?, status = ?, information = ?, category = ?, picture = ? WHERE event_id = ?',
            [data.name, data.organizer, data.address, data.from_date, data.to_date, data.capacity, data.status, data.information, data.category, data.picture, eventId], callback);
    }
    deleteEvent(eventId : number,  callback){
        super.query('DELETE FROM event WHERE event_id = ?', [eventId], callback);
    }

    getEventsOfUser(userId : number, callback) {
        super.query('SELECT event.* FROM event, user_event WHERE user_event.user_id = ? AND event.event_id = user_event.event_id', [userId], callback)
    }


    // Search for an events
    searchForEvents(input: string, callback) {
        var sql1 = 'SELECT * FROM event WHERE name like ? or address like ? or information like ? or category like ? order by event_id desc;';

        var sql2 = "Select * from event, user where event.organizer = user.user_id and user.name like ? order by event_id desc;";

        let events: event[];
        super.query(sql1,
            ["%"+input+"%", "%"+input+"%","%"+input+"%","%"+input+"%"],
            (status , data) => {
                if (status == 500){
                    console.log("Error: search for event");
                    callback("error search for events")
                }
                else {
                    events = data.forEach().concat(events);
                }
            })

        super.query(sql2, ["%"+input+"%"],
            (status , data) => {
                if (status == 500){
                    console.log("Error: search for event");
                    callback("error search for events")
                }
                else {
                    events = data.forEach().concat(events);
                }
            }
        );
    }
};
