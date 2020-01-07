import axios from "axios";
import Service from "./Service";

interface User{
    userId: number;
    name: string;
    email: string;
    mobile: number;
    hash: string;
    salt: string;
    type: string;
    picture: string;
}

export default class UserService extends Service {

    getAllUsers(){
        return axios.get<User[]>(this.path + "/user").then(response => response.data);
    }

    getUserById(userId: number){
        return axios.get<User>(this.path + "/user/" + userId).then(response => response.data);
    }

    getUserOfType(type: string){
        return axios.get<User[]>(this.path + "/user/type/" + type).then(response => response.data);
    }

    getHashOfUser(userId: number){
        return axios.get(this.path + "FYLL INN").then(response => response.data);
    }

    addUser(user: User){
        return axios.post(this.path + "/user", user).then(response => response.data);
    }

    updateUser(user: User){
        return axios.put(this.path + "/user/" + user.userId).then(response => response.data);
    }

    
}