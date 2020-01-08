const daoParentUser = require("./dao.ts");
const User = require("./User.ts");

export interface user {
    user_id: number,
    name: string,
    mobile: number,
    email: string,
    hash: string,
    salt: string,
    type: string,
    picture: string
}

export default class userDao extends daoParentUser{
    constructor(pool){
        super(pool);
    }

    getAllUsers(callback){
        super.query("SELECT * FROM user", [], callback);
    }

    getUser(userId: number, callback){
        super.query("SELECT * FROM user WHERE user_id = ?", [userId], callback);
    }

    getUserByEMail(email: string, callback){
        super.query("SELECT * FROM user WHERE email = ?", [email], callback);
    }

    getUsersOfType(type: string, callback){
        super.query("SELECT * FROM user WHERE type = ?", [type], callback);
    }

    getHashOfUser(userId: number, callback){
        super.query("SELECT hash FROM user WHERE user_id = ?", [userId], callback)
    }

    getOrganizerForEvent(eventId: number, callback){
        super.query("SELECT user.* FROM user, event WHERE event.event_id = ? AND event.organizer = user.user_id", [eventId], callback);
    }

    addUser(data:user, callback){
        super.query("INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)",
            [data.name, data.email, data.mobile, data.hash, data.salt, data.type, data.picture], callback);
    }

    updateUser(userId: number, data: user, callback){
        super.query("UPDATE user SET name = ?, email = ?, mobile = ?, hash = ?, salt = ?, type = ?, picture = ? WHERE user_id = ?",
            [data.name, data.email, data.mobile, data.hash, data.salt, data.type, data.picture, userId], callback);
    }
    deleteUser(userId: number, callback){
        super.query("DELETE FROM user WHERE user_id=?", [userId], callback)
    }
};
