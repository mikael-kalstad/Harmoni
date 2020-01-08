import axios from "axios";
import Service from "./Service";

interface Rider {
    riderId : number;
    text : string;
}

export default class EventService extends Service {
    getAllRiders(){
        return axios.get(this.path+'/riders').then(response =>response.data);
    }
    getRider(riderId:number){
        return axios.get(this.path+'/riders/'+riderId).then(response =>response.data);
    }
    getRiderByEventId(eventId:number){
        return axios.get(this.path+'/riders/event/'+eventId).then(response=>response.data);
    }
    getRiderByUserIdEvent(eventId:number,userId:number){
        return axios.get(this.path+'/riders/event/'+eventId+'/user/'+userId).then(response => response.data);
    }

    addRider(rider:Rider){
        return axios.post(this.path+'/riders').then(response=>response.data);
    }
    updateRider(rider:Rider){
        return axios.put(this.path+'/riders'+rider.riderId).then(response=>response.data);
    }
    deleteRiderList(eventId:number,userId:number, riderId:number){
        return axios.delete(this.path+'/riders/event/'+eventId+'/user/'+userId+'/'+riderId).then(response => response.data);
    }
}
