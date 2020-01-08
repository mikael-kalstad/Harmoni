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

    // Fetches all users
    getAllUsers(){
        return axios.get<User[]>(this.path + "/users").then(response => response.data);
    }

    // Fetches one user by its id
    getUserById(userId: number){
        return axios.get<User>(this.path + "/users/" + userId).then(response => response.data);
    }

    // Fetches one user by its email
    getUserByEMail(email: string){
        return axios.get<User>(this.path + "/users/email/" + email).then(response => response.data);
    }

    // Fetches all users of one type
    getUsersOfType(type: string){
        return axios.get<User[]>(this.path + "/users/type/" + type).then(response => response.data);
    }

    // Fetches the hash of one user
    getHashOfUser(userId: number){
        return axios.get(this.path + "/users/hash/" + userId).then(response => response.data);
    }

    // Fetches the organizer of an event by its id
    getOrganizerForEvent(eventId: number){
        return axios.get(this.path + "/users/organizer/" + eventId).then(response => response.data);
    }

    // Adds a user
    addUser(user: User){
        return axios.post(this.path + "/users", user).then(response => response.data);
    }

    // Updates a user
    updateUser(user: User){
        return axios.put(this.path + "/users/" + user.userId, user).then(response => response.data);
    }

    // Deletes a user
    deleteUser(userId: number){
        return axios.delete(this.path + "/users/" + userId).then(response => response.data);
    }
}