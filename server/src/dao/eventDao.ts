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
};
