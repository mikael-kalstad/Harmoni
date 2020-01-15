import axios from 'axios';
import Service, {updateToken} from './Service';
import LoginService from "./loginService";

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

class EventService extends Service{
  getEventById(eventId: number) {
    updateToken();
     return axios
      .get(this.path + '/events/' + eventId)
      .then(response => response.data);
  }

  getAllEvents() {
    updateToken();
    return axios.get(this.path + '/events/')
    .then(response => response.data);
  }

  getEventsByLocation(location: string) {
    updateToken();
    return axios
      .get(this.path + '/events/address/' + location)
      .then(response => response.data);
  }

  getEventsByStatus(status: string) {
    updateToken();
    return axios
      .get(this.path + '/events/status/' + status)
      .then(respnse => respnse.data);
  }
  // Gets events to an organizer by id
  getEventsByOrganizer(userId: number) {
    updateToken();
    return axios
      .get(this.path + '/events/organizer/' + userId)
      .then(response => response.data);
  }

  addEvent(event: Event) {
    updateToken();
    return axios
      .post(this.path + '/authorized/events/', event)
      .then(response => response.data);
  }
  updateEvent(event: Event) {
    updateToken();
    return axios
      .put(this.path + '/authorized/events/' + event.eventId, event)
      .then(response => response.data);
  }
  getEventsByUser(userId: number) {
    updateToken();
    return axios
      .get(this.path + '/events/user/' + userId)
      .then(response => response.data);
  }
  getEventsByCategory(category: string) {
    updateToken();
    return axios
        .get(this.path + '/events/category/' + category)
        .then(response => response.data);
  }
  // Gets events by eventId
  deleteEventById(eventId: number) {
    updateToken();
    return axios
      .delete(this.path + '/authorized/events/' + eventId)
      .then(response => response.data);
  }
}

export let eventService = new EventService();
