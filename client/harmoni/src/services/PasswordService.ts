import axios from "axios";
import Service from "./Service";

export default class PasswordService extends Service {
  requestPasswordReset(email: string) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    var postData = {
      email: email
    };
    return axios
      .post(this.path + "/reset/", postData, {
        headers: headers
      })
      .then(response => {
        return response;
      })
      .catch(error => console.log(error));
  }
  newPassword(password: string) {
    var postData = {
      password: password
    };
    return axios
      .post(this.path + window.location.pathname, postData, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "harmoni-token": localStorage.getItem("harmoni-token")
        }
      })
      .then(response => {
        return response;
      })
      .catch(error => console.log(error));
  }
}

export let passwordService = new PasswordService();
