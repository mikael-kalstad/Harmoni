const daoParentTicket = require('./dao.ts');
const Ticket = require('./Ticket.ts');

module.exports = class ticketDao extends daoParentTicket {
    constructor(pool) {
        super(pool);
    }

    getAllTickets(callback) {
        super.query("SELECT * FROM ticket", [], callback);
    }

    getTicketsByEventId(eventId : number, callback) {
        super.query('SELECT * FROM ticket WHERE event_id = ?', [eventId], callback);
    }

    addTicket(ticket, callback) {
        super.query('INSERT INTO ticket VALUES(DEFAULT, ?, ?, ?)', [ticket.eventId, ticket.price, ticket.type], callback);
    }
};
