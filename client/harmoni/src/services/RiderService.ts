import axios from 'axios';
import Service,{updateToken} from './Service';

interface Rider {
  riderId: number;
  text: string;
}

export default class RiderService extends Service {
  getAllRiders() {
    updateToken();
    return axios.get(this.path + '/riders/').then(response => response.data);
  }

  getRider(riderId: number) {
    updateToken();
    return axios
      .get(this.path + '/riders/' + riderId)
      .then(response =>{ response.data;
      console.log(response.data.body);});
  }
  getRiderByEventId(eventId: number) {
    updateToken();
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + eventId)
      .then(response => response.data);
  }
  getRiderByUserIdEvent(eventId: number, userId: number) {
    updateToken();
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId)
      .then(response => response.data);
  }
  addRider(rider: Rider) {
    updateToken();
    return axios.post(this.path + '/authorized/riders/').then(response => response.data);
  }
  updateRider(rider: Rider) {
    updateToken();
    return axios
      .put(this.path + '/authorized/riders/' + rider.riderId)
      .then(response => response.data);
  }
  deleteRider(riderId: number) {
    updateToken();
    return axios
      .delete(this.path + '/authorized/riders/' + riderId)
      .then(response => response.data);
  }
  addRiderList(eventId: number, userId: number) {
    updateToken();
    return axios
      .post(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId)
      .then(response => response.data);
  }
  deleteRiderList(riderListId: number) {
    updateToken();
    return axios
      .delete(this.path + '/authorized/riders/riderlist/' + riderListId)
      .then(response => response.data);
  }
}

export let riderService = new RiderService();
