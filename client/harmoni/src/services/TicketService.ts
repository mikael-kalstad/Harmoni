import axios from 'axios';
import Service, { updateToken } from './Service';

interface Ticket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

class TicketService extends Service {
  getAllTickets() {
    updateToken();
    return axios
      .get<Ticket[]>(this.path + '/tickets/')
      .then(response => response.data);
  }

  getAllTicketsByEventId(eventId: number) {
    updateToken();
    return axios
      .get<Ticket[]>(this.path + '/tickets/event/' + eventId)
      .then(response => response.data);
  }

  addTickets() {
    updateToken();
    return axios
      .post(this.path + '/authorized/tickets/')
      .then(response => response.data);
  }

  decreaseAvailableOfTicket(ticketId: number, value: number) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    return axios
      .put(
        this.path + '/authorized/tickets/available/' + ticketId + '&' + value,
        { headers: headers }
      )
      .then(response => response.data);
  }

  deleteTicket(ticketId: number) {
    updateToken();
    return axios
      .delete(this.path + '/authorized/tickets/' + ticketId)
      .then(response => response.data);
  }
  deleteTicketsByEventId(eventId: number) {
    updateToken();
    return axios
      .delete(this.path + '/authorized/tickets/event/' + eventId)
      .then(response => response.data);
  }
}

export let ticketService = new TicketService();
