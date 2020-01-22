import Service from "./Service";
import axios from "axios";

export default class EmailService extends Service {
    sendEmail(email: string, message: string, subject: string) {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "harmoni-token": localStorage.getItem("harmoni-token")
        };
        var postData = {
            subject: subject,
            email: email,
            message: message
        };
        return axios
            .post(this.path + "/send_email/", postData, {
                headers: headers
            })
            .then(response => {
                return response;
            })
            .catch(error => console.log(error));
    }
}
export let emailService = new EmailService();
