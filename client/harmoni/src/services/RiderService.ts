import axios from 'axios';
import Service,{updateToken} from './Service';

interface Rider {
  riderId: number;
  text: string;
}
interface RiderList {
  riderListId:number;
  userId:number;
  eventId:number;
  riderId:number;
  text:string;
  quantity;number;
}

export default class RiderService extends Service {
  getAllRiders() {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/riders/',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  getRider(riderId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/riders/' + riderId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  getRiderByEventId(eventId: number) {
    updateToken();
    return axios({
      method: 'get',
      url:this.path + '/authorized/riders/riderlist/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  getRiderByUserIdEventId(eventId: number, userId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/riders/riderlist/' + userId + '/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }

  addRider(rider: Rider) {
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/riders/',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  updateRider(rider: Rider) {
    updateToken();
    return axios({
      method: 'put',
      url: this.path + '/authorized/riders/' + rider.riderId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  deleteRider(riderId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/riders/' + riderId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  addRiderList(eventId: number, userId: number, riderId:number,text:string, quantity:number) {
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/riders/riderlist/'+eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      },
      data:{
        eventId:eventId, userId:userId, riderId:riderId, text:text, quantity:quantity
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
  deleteRiderList(riderListId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/riders/riderlist/' + riderListId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>response.data).catch(error => console.log(error));
  }
}

export let riderService = new RiderService();
