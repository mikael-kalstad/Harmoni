import axios from 'axios';

export default class PasswordService {
    requestPasswordReset(email:string){
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        var postData = {
            email: email
        };
        return axios.post("http://localhost:15016/api/v0/reset/",postData,{
            headers: headers
        })
            .then(response =>{
                return response;
            } )
            .catch(error => console.log(error)); 
    }
    newPassword(password: string){
          var postData = {
            password: password
        };
        //Litt usikkert om denne URL'en fungerer
        return axios.post("/reset/reset_password/:token" + "/" + window.location.pathname, postData,{  
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(response =>{
                return response;
            } )
            .catch(error => console.log(error)); 
    }
}
    

export let passwordService = new PasswordService();