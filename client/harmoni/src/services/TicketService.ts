import axios from 'axios';
import Service, {updateToken} from './Service';

interface Ticket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

class TicketService extends Service {
  getAllTickets() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<Ticket[]>(this.path + '/tickets/', {headers:headers})
      .then(response => response.data);
  }

  getAllTicketsByEventId(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<Ticket[]>(this.path + '/tickets/event/' + eventId, {headers:headers})
      .then(response => response.data);
  }

  addTickets() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/tickets/', {headers:headers})
      .then(response => response.data);
  }

  decreaseAvailableOfTicket(ticketId: number, value: number) {
    return axios
      .put(
        this.path + '/authorized/tickets/available/' + ticketId + '&' + value
      )
      .then(response => response.data);
  }

  deleteTicket(ticketId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/tickets/' + ticketId, {headers:headers})
      .then(response => response.data);
  }
  deleteTicketsByEventId(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/tickets/event/' + eventId, {headers:headers})
      .then(response => response.data);
  }
}

export let ticketService = new TicketService();
