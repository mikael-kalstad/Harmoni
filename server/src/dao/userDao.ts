const daoParentUser = require("./dao.ts");
const User = require("./User.ts");

module.exports = class userDao extends daoParentUser{
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

    addUser(user, callback){
        super.query("INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)", [user.name, user.email, user.mobile, user.hash, user.salt, user.type, user.picture], callback);
    }

    updateUser(userId: number, user, callback){
        super.query("UPDATE user SET name = ?, email = ?, mobile = ?, hash = ?, salt = ?, type = ?, picture = ? WHERE user_id = ?", [user.name, user.email, user.mobile, user.hash, user.salt, user.type, user.picture, userId], callback);
    }
};
