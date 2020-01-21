import axios from "axios";
import Service, { updateToken } from "./Service";

interface RiderList {
  userId: number;
  eventId: number;
  text: string;
}

export default class RiderService extends Service {
  getAllRiderLists() {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/riders/",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getRider(riderId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/riders/" + riderId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  getRiderByEventId(eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/authorized/riders/riderlist/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getRiderByUserIdEventId(eventId: number, userId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/authorized/riders/riderlist/" + userId + "/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  updateRider(rider: RiderList) {
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/riders/",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  addRiderList(eventId: number, userId: number, text: string) {
    updateToken();
    return axios({
      method: "post",
      url: this.path + "/authorized/riders/riderlist/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      },
      data: {
        eventId: eventId,
        userId: userId,
        text: text
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  deleteRiderList(riderListId: number) {
    updateToken();
    return axios({
      method: "delete",
      url: this.path + "/authorized/riders/riderlist/" + riderListId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export let riderService = new RiderService();
