import axios from "axios";
import Service, { updateToken } from "./Service";

interface User {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  type: string;
  picture: string;
}

class UserService extends Service {
  // Fetches all users
  getAllUsers() {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Fetches one user by its id
  getUserById(userId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/" + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Fetches one user by its email
  getUserByEMail(email: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/email/" + email,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getUserAllInfoByEMail(email: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/email/info/" + email,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Fetches all users of one type
  getUsersOfType(type: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/authorized/users/type/" + type,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Fetches the hash of one user
  getHashOfUser(email: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/hash/" + email,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Fetches the organizer of an event by its id
  getOrganizerForEvent(eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/organizer/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  //Fetches all artists for an event
  getArtistsForEvent(eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/users/artists/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  //Fetches all volunteers for an event
  getVolunteersForEvent(eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/authorized/users/volunteers" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Adds a user
  addUser(user: User) {
    updateToken();
    return axios({
      method: "post",
      url: this.path + "/users/",
      data: user,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => error);
  }

  // Updates a user
  updateUser(user: User) {
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/users/" + user.user_id,
      data: user,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => {
        updateToken();
        return response;
      })
      .catch(error => console.log(error));
  }

  changePicture(userID: number, picture) {
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/users/change_picture/" + userID,
      data: picture,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  changePassword(email: string, newPassword: string, oldPassword: string) {
    let postData = {
      email: email,
      newPassword: newPassword,
      oldPassword: oldPassword
    };
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/users/change_password/" + email,
      data: postData,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Deletes a user
  deleteUser(userId: number) {
    updateToken();
    return axios({
      method: "delete",
      url: this.path + "/authorized/users/" + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export let userService = new UserService();
