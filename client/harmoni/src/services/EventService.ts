import axios from 'axios';
import Service, { updateToken } from './Service';
import LoginService from './loginService';

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
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/' + eventId, { headers: headers })
      .then(response => response.data);
  }

  getAllEvents() {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/', { headers: headers })
      .then(response => response.data);
  }

  getEventsByLocation(location: string) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/address/' + location, { headers: headers })
      .then(response => response.data);
  }

  getEventsByStatus(status: string) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/status/' + status, { headers: headers })
      .then(respnse => respnse.data);
  }
  // Gets events to an organizer by id
  getEventsByOrganizer(userId: number) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/organizer/' + userId, { headers: headers })
      .then(response => response.data);
  }

  addEvent(event: Event) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/events/', event, { headers: headers })
      .then(response => response.data);
  }

  addUserToEvent(userId: number, eventId: number) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .post(
        this.path + '/authorized/events/user_event/' + userId + '/' + eventId,
        { headers: headers }
      )
      .then(response => response.data);
  }

  updateEvent(event: Event) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .put(this.path + '/authorized/events/' + event.eventId, event, {
        headers: headers
      })
      .then(response => response.data);
  }
  getEventsByUser(userId: number) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/user/' + userId, { headers: headers })
      .then(response => response.data);
  }
  getEventsByCategory(category: string) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .get(this.path + '/events/category/' + category, { headers: headers })
      .then(response => response.data);
  }
  // Gets events by eventId
  deleteEventById(eventId: number) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'harmoni-token': localStorage.getItem('harmoni-token')
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/events/' + eventId, { headers: headers })
      .then(response => response.data);
  }
}

export let eventService = new EventService();
