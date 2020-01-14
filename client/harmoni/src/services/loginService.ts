import axios from "axios";
// import {Simulate} from "react-dom/test-utils";
// import { error } = Simulate.error;

export default class LoginService {
  login(email: string, password: string) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    var postData = {
      email: email,
      password: password
    };
    return axios
      .post("http://localhost:15016/api/login/", postData, {
        headers: headers
      })
      .then(response => {
        localStorage.setItem("harmoni-token", response.data.jwt);
        return response;
      })
      .catch(error => error);
  }

  checkToken() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    return axios
      .post("http://localhost:15016/api/login/token", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem("harmoni-token", response.data.jwt);
        return response;
      })
      .catch(error => console.log(error));
  }

  registerPerson(
    name: string,
    email: string,
    mobile: number | undefined,
    password: string,
    type: string,
    picture: string
  ) {
    var postData = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      type: type,
      picture: picture,
      salt: "",
      hash: ""
    };
    const headers = {
      "content-Type": "application/json;charset=utf-8"
    };
    return axios
      .post("http://localhost:15016/api/login/register", postData, {
        headers: headers
      })
      .then(response => {
        if (response.status === 409) {
          console.log("User exists from before.");
        } else localStorage.setItem("harmoni-token", response.data.jwt);

        return response;
      })
      .catch(error => error.response);
  }
}

export let loginService = new LoginService();
