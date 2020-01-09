import axios from 'axios';


export default class LoginService {
    login(email:string, password:string){
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        var postData = {
            email: email,
            password: password
        };
        return axios.post("http://localhost:15016/login/",postData,{
            headers: headers
        })
            .then(response =>{
                localStorage.setItem("x-access-token",response.data.jwt)
            } )
            .catch(error => alert(error));
    }
    updateToken(){
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            "x-access-token":localStorage.getItem("x-access-token")
        }
        return axios.get("http://localhost:15016/login/token",{
            headers: headers
        }).then(response => {
            localStorage.setItem("x-access-token",response.data.jwt)
        }).catch(error => alert(error));
    }
    registrerPerson(name:string,email:string, mobile:number,password:string,type:string, picture:string ) {
        var postData = {
            name:name,
            email: email,
            password: password,
            mobile:mobile,
            type:type,
            picture:picture,
            salt:"",
            hash:""
        };
        const headers = {
            "content-Type": "application/json;charset=utf-8",
        }
        return axios.post("http://localhost:15016/login/register",postData,{
            headers: headers
        })
            .then(response =>{
                localStorage.setItem("x-access-token",response.data.jwt)
            } )
            .catch(error => alert(error));
    }
}
