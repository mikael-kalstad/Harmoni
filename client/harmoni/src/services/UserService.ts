import axios from 'axios';
import Service, {updateToken} from './Service';

interface User {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: string;
}

class UserService extends Service {
  // Fetches all users
  getAllUsers() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<User[]>(this.path + '/users/', {headers:headers})
      .then(response => response.data);
  }

  // Fetches one user by its id
  getUserById(userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<User>(this.path + '/users/' + userId, {headers:headers})
      .then(response => response.data);
  }

  // Fetches one user by its email
  getUserByEMail(email: string) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<User>(this.path + '/users/email/' + email, {headers:headers})
      .then(response => response.data);
  }

  // Fetches all users of one type
  getUsersOfType(type: string) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<User[]>(this.path + '/authorized/users/type/' + type, {headers:headers})
      .then(response => response.data);
  }

  // Fetches the hash of one user
  getHashOfUser(userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/users/hash/' + userId, {headers:headers})
      .then(response => response.data);
  }

  // Fetches the organizer of an event by its id
  getOrganizerForEvent(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/users/organizer/' + eventId, {headers:headers})
      .then(response => response.data);
  }
  //Fetches all artists for an event
  getArtistsForEvent(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/users/artists/' + eventId, {headers:headers})
      .then(response => response.data);
  }
  //Fetches all volunteers for an event
  getVolunteersForEvent(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get(this.path + '/authorized/users/volunteers' + eventId, {headers:headers})
      .then(response => response.data);
  }

  // Adds a user
  addUser(user: User) {
    const headers = {
      "Content-Type": "application/json; multipart/form-data; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/users/', user, {headers: headers})
      .then(response => response.data);
  }

  // Updates a user
  updateUser(user: User) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .put(this.path + '/authorized/users/' + user.user_id, user,{headers: headers})
      .then(response => response.data);
  }

  changePicture(userID:number,picture){
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
        .put(this.path + '/authorized/users/change_picture/' + userID, picture,{headers: headers})
        .then(response => response.data);
  }


  changePassword(userID:number,newPassword:string, oldPassword:string){
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    let postData={
      userID:userID,newPassword:newPassword,oldPassword:oldPassword
    };
    return axios
        .put(this.path+'/authorized/users/change_password/'+userID, postData,{headers: headers})
        .then(response => response.data);
  }

  // Deletes a user
  deleteUser(userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/users/' + userId,{headers: headers})
      .then(response => response.data);
  }
}

export let userService = new UserService();
