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
        return axios.get<Ticket[]>(this.path + "/ticket").then(response => response.data);
    }

    getAllTicketsByEventId(eventId: number){
        return axios.get<Ticket[]>(this.path + "/ticket/event/" + eventId).then(response => response.data);
    }
   
    addTickets(){
        return axios.post(this.path + "/ticket/").then(response => response.data);
    }
}
