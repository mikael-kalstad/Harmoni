import axios from 'axios';
import Service,{updateToken} from './Service';

interface Rider {
  riderId: number;
  text: string;
}

export default class RiderService extends Service {
  getAllRiders() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios.get(this.path + '/riders/', {headers:headers}).then(response => response.data);
  }

  getRider(riderId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/riders/' + riderId, {headers:headers})
      .then(response =>{ response.data;
      console.log(response.data.body);});
  }
  getRiderByEventId(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + eventId, {headers:headers})
      .then(response => response.data);
  }
  getRiderByUserIdEvent(eventId: number, userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId, {headers:headers})
      .then(response => response.data);
  }
  addRider(rider: Rider) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios.post(this.path + '/authorized/riders/', {headers:headers}).then(response => response.data);
  }
  updateRider(rider: Rider) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .put(this.path + '/authorized/riders/' + rider.riderId, {headers:headers})
      .then(response => response.data);
  }
  deleteRider(riderId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/riders/' + riderId, {headers:headers})
      .then(response => response.data);
  }
  addRiderList(eventId: number, userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId, {headers:headers})
      .then(response => response.data);
  }
  deleteRiderList(riderListId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/riders/riderlist/' + riderListId, {headers:headers})
      .then(response => response.data);
  }
}

export let riderService = new RiderService();
