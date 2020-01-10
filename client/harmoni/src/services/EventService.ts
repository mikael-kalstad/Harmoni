import axios from 'axios';
import Service from './Service';

interface Event {
  eventId: number;
  name: string;
  organizer: number;
  address: string;
  fromDate: string;
  toDate: string;
  capacity: number;
  status: string;
}

class EventService extends Service {
  getEventById(eventId: number) {
    return axios
      .get(this.path + '/events/' + eventId)
      .then(response => response.data);
  }

  getAllEvents() {
    return axios.get(this.path + '/events/')
    .then(response => response.data);
  }

  getEventsByLocation(location: string) {
    return axios
      .get(this.path + '/events/address/' + location)
      .then(response => response.data);
  }

  getEventsByStatus(status: string) {
    return axios
      .get(this.path + '/events/status/' + status)
      .then(respnse => respnse.data);
  }
  getEventsByOrganizer(userId: number) {
    return axios
      .get(this.path + '/events/organizer/' + userId)
      .then(response => response.data);
  }

  addEvent(event: Event) {
    return axios
      .post(this.path + '/authorized/events/', event)
      .then(response => response.data);
  }
  updateEvent(event: Event) {
    return axios
      .put(this.path + '/authorized/events/' + event.eventId, event)
      .then(response => response.data);
  }
  getEventsByUser(userId: number) {
    return axios
      .get(this.path + '/events/user/' + userId)
      .then(response => response.data);
  }
  deleteEventById(eventId: number) {
    return axios
      .delete(this.path + '/authorized/events/' + eventId)
      .then(response => response.data);
  }
}

export let eventService = new EventService();
