import axios from "axios";
import Service from "./Service";

interface Ticket{
    ticketId: number;
    eventId: number;
    price: number;
    type: string;
}


export default class TicketService extends Service {

    getAllTickets(){
        return axios.get<Ticket[]>(this.path + "/ticket/FYLL INN").then(response => response.data);
    }

    getAllTicketsByEventId(){
        return axios.get<Ticket[]>(this.path + "/ticket/FYLL INN").then(response => esponse.data);
    }
   
    addTickets(){
        return axios.post(this.path + "/ticket/FYLL INN").then(response => response.data);
    }
}
