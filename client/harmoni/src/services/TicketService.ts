import axios from 'axios';
import Service from './Service';

interface Ticket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
}

class TicketService extends Service {
  getAllTickets() {
    return axios
      .get<Ticket[]>(this.path + '/tickets/')
      .then(response => response.data);
  }

  getAllTicketsByEventId(eventId: number) {
    return axios
      .get<Ticket[]>(this.path + '/tickets/event/' + eventId)
      .then(response => response.data);
  }

  addTickets() {
    return axios.post(this.path + '/tickets/').then(response => response.data);
  }
  deleteTicket(ticketId: number) {
    return axios
      .delete(this.path + '/tickets/' + ticketId)
      .then(response => response.data);
  }
  deleteTicketsByEventId(eventId: number) {
    return axios
      .delete(this.path + '/tickets/event/' + eventId)
      .then(response => response.data);
  }
}

export let ticketService = new TicketService();
