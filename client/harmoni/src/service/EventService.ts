import axios from "axios";
import Service from "./Service";
import {renderToStaticMarkup} from "react-dom/server";
interface Event {
    eventId : number;
    name : string;
    organizer : number;
    location : string;
    fromDate : string;
    toDate : string;
    capacity : number;
    status : string;
}

export default class EventService extends Service {
    getEventById(eventId: number){
        return axios.get(this.path+'/events/'+eventId).then(response=>response.data)
    }

    getAllEvents(){
        return axios.get(this.path+'/events').then(response =>response.data);
    }

    getEventsByLocation(location: string){
        return axios.get(this.path+'/events/'+location).then(response =>response.data);
    }

    getEventsByStatus(){
        return axios.get(this.path+'/events').then(respnse=>respnse.data);
    }
    getEventsByOrganizer(userId:number){
        return axios.get(this.path+'/events/'+userId).then(response =>response.data);
    }

    addEvent(event:Event){
        return axios.post(this.path+'/events/add',event).then(response=>response.data);
    }
    updateEvent(event:Event){
        return axios.put(this.path+'/events/'+event.eventId,event).then(response=>response.data);
    }
    getEventsOfUser(userId:number){
        return axios.get(this.path+'/events/'+userId).then(response=>response.data);
    }
}