import axios from "axios";

export default class Service{
    path = "http://localhost:15016/api/v0";

}
export function updateToken() {
    return axios
        .post("http://localhost:15016/api/v0/updatetoken", {
            "Content-Type": "application/json; charset=utf-8",
            "harmoni-token": localStorage.getItem("harmoni-token")
        })
        .then(response => {
            if(response.data.jwt!==undefined){
                localStorage.setItem("harmoni-token", response.data.jwt);
            }
        })
        .catch(error => error);
};