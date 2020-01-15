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
    return axios({
      method: 'get',
      url: this.path + '/tickets/',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  getAllTicketsByEventId(eventId: number) {
    updateToken();
    return axios({
      method: 'get',
      url:this.path + '/tickets/event/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  addTickets() {
    updateToken();
    return axios({
      method: 'post',
      url:this.path + '/authorized/tickets/',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  decreaseAvailableOfTicket(ticketId: number, value: number) {
    updateToken();
    return axios({
      method: 'put',
      url: this.path + '/authorized/tickets/available/' + ticketId + '&' + value,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  deleteTicket(ticketId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/tickets/' + ticketId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  deleteTicketsByEventId(eventId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/tickets/event/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
}

export let ticketService = new TicketService();
