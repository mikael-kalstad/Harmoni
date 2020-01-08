const daoParentUser = require("./dao.ts");
const User = require("./User.ts");

module.exports = class userDao extends daoParentUser{
    constructor(pool){
        super(pool);
    }

    // Gets all users
    getAllUsers(callback){
        super.query("SELECT * FROM user", [], callback);
    }

    // Gets a user by its id
    getUser(userId: number, callback){
        super.query("SELECT * FROM user WHERE user_id = ?", [userId], callback);
    }

    // Gets a user by its mail
    getUserByEMail(email: string, callback){
        super.query("SELECT * FROM user WHERE email = ?", [email], callback);
    }

    // Gets all users of a type
    getUsersOfType(type: string, callback){
        super.query("SELECT * FROM user WHERE type = ?", [type], callback);
    }

    // Gets the hash of a user
    getHashOfUser(userId: number, callback){
        super.query("SELECT hash FROM user WHERE user_id = ?", [userId], callback)
    }

    // Gets the organizer for an event
    getOrganizerForEvent(eventId: number, callback){
        super.query("SELECT user.* FROM user, event WHERE event.event_id = ? AND event.organizer = user.user_id", [eventId], callback);
    }

    // Gets all artists for an event
    getArtistsForEvent(eventId: number, callback){
        super.query("SELECT user.* FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'artist'", [eventId], callback);
    }

    // Gets all volunteers for an event
    getVolunteersForEvent(eventId: number, callback){
        super.query("SELECT user.* FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'volunteer'", [eventId], callback);
    }

    // Adds a user
    addUser(user, callback){
        super.query("INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)", [user.name, user.email, user.mobile, user.hash, user.salt, user.type, user.picture], callback);
    }

    // Updates a user by its userid
    updateUser(userId: number, user, callback){
        super.query("UPDATE user SET name = ?, email = ?, mobile = ?, hash = ?, salt = ?, type = ?, picture = ? WHERE user_id = ?", [user.name, user.email, user.mobile, user.hash, user.salt, user.type, user.picture, userId], callback);
    }

    // Deletes a user by its id
    deleteUser(userId: number, callback){
        super.query("DELETE FROM user WHERE user_id=?", [userId], callback)
    }
};
