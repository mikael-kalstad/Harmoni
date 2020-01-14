const daoParentTicket = require('./dao');

export interface ticket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

export default class ticketDao extends daoParentTicket {
  constructor(pool) {
    super(pool);
  }

  getAllTickets(callback) {
    super.query('SELECT * FROM ticket', [], callback);
  }

  getTicketsByEventId(eventId: number, callback) {
    super.query('SELECT * FROM ticket WHERE event_id = ?', [eventId], callback);
  }

  addTicket(ticket: ticket, callback) {
    super.query(
      'INSERT INTO ticket VALUES(DEFAULT, ?, ?, ?, ?)',
      [ticket.event_id, ticket.price, ticket.type, ticket.available],
      callback
    );
  }

  deleteTicket(ticketId: number, callback) {
    super.query('DELETE FROM ticket WHERE ticket_id = ?', [ticketId], callback);
  }

  deleteAllTicketsForEvent(eventId: number, callback) {
    super.query('DELETE FROM ticket WHERE event_id = ?', [eventId], callback);
  }
}
