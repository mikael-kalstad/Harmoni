/**
 * The attachmentDao-class is used to do everything has to do with
 * Ticket such get,create update...
 */
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

  // Gets all tickets of specific event
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

  // Used to decrease available if buyTicket button clicked
  decreaseAvailableOfTicket(ticketId: number, value: number, callback) {
    super.query(
      'UPDATE ticket SET available = available - ? WHERE ticket_id = ?',
      [value, ticketId],
      callback
    );
  }

  // Deletes specific ticket given ticketId
  deleteTicket(ticketId: number, callback) {
    super.query('DELETE FROM ticket WHERE ticket_id = ?', [ticketId], callback);
  }

  // Deletes all tickets of specific event given eventId
  deleteAllTicketsForEvent(eventId: number, callback) {
    super.query('DELETE FROM ticket WHERE event_id = ?', [eventId], callback);
  }
}
