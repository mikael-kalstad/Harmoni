import axios from 'axios';
import Service from './Service';

interface Rider {
  riderId: number;
  text: string;
}

export default class RiderService extends Service {
  getAllRiders() {
    return axios.get(this.path + '/riders/').then(response => response.data);
  }
  getRider(riderId: number) {
    return axios
      .get(this.path + '/riders/' + riderId)
      .then(response => response.data);
  }
  getRiderByEventId(eventId: number) {
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + eventId)
      .then(response => response.data);
  }
  getRiderByUserIdEvent(eventId: number, userId: number) {
    return axios
      .get(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId)
      .then(response => response.data);
  }
  addRider(rider: Rider) {
    return axios.post(this.path + '/authorized/riders/').then(response => response.data);
  }
  updateRider(rider: Rider) {
    return axios
      .put(this.path + '/authorized/riders/' + rider.riderId)
      .then(response => response.data);
  }
  deleteRider(riderId: number) {
    return axios
      .delete(this.path + '/authorized/riders/' + riderId)
      .then(response => response.data);
  }
  addRiderList(eventId: number, userId: number) {
    return axios
      .post(this.path + '/authorized/riders/riderlist/' + userId + '&' + eventId)
      .then(response => response.data);
  }
  deleteRiderList(riderListId: number) {
    return axios
      .delete(this.path + '/authorized/riders/riderlist/' + riderListId)
      .then(response => response.data);
  }
}

export let riderService = new RiderService();
