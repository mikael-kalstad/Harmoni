const daoParentUser = require("./dao");
import { compareHash, hash } from '../hashing';
//const User = require("./User.ts");

export interface user {
    user_id: number,
    name: string,
    mobile: number,
    email: string,
    hash: string,
    salt: string,
    type: string,
    picture: Buffer,
}

export function sanitizeUser(data) {
    if (data["hash"])
        delete data["hash"];
    if (data["salt"])
        delete data["salt"];

    return data;
}

export default class userDao extends daoParentUser {
    constructor(pool) {
        super(pool);
    }

    // Gets all users
    getAllUsers(callback) {
        super.query("SELECT * FROM user", [], callback);
    }

    // Gets a user by its id
    getUser(userId: number, callback) {
        super.query("SELECT * FROM user WHERE user_id = ?", [userId], callback);
    }


    // Gets a user by its mail
    getUserByEMail(email: string, callback) {
        super.query("SELECT * FROM user WHERE email = ?", [email], callback);
    }

    // Gets all users of a type
    getUsersOfType(type: string, callback) {
        super.query("SELECT * FROM user WHERE type = ?", [type], callback);
    }

    // Gets the hash of a user
    getHashOfUser(userId: number, callback) {
        super.query("SELECT hash, salt FROM user WHERE user_id = ?", [userId], callback)
    }

    // Gets the organizer for an event
    getOrganizerForEvent(eventId: number, callback) {
        super.query("SELECT user.* FROM user, event WHERE event.event_id = ? AND event.organizer = user.user_id", [eventId], callback);
    }

    // Gets all artists for an event
    getArtistsForEvent(eventId: number, callback) {
        super.query("SELECT user.* FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'artist'", [eventId], callback);
    }

    // Gets all volunteers for an event
    getVolunteersForEvent(eventId: number, callback) {
        super.query("SELECT user.* FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'volunteer'", [eventId], callback);
    }

    // Adds a user 
    addUser(data: user, callback) {
        super.query("INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)",
            [data.name, data.email, data.mobile, data.hash, data.salt, data.type, data.picture], callback);
    }

    // Updates a user
    updateUser(userId: number, data: user, callback) {
        let user;
        this.getUser(userId, (status, olddata) => {
            user = olddata[0];
            if (typeof data.name == "undefined") {
                data.name = user.name;
            }
            if (typeof data.email == "undefined") {
                data.email = user.email;
            } if (typeof data.type == "undefined") {
                data.type = user.type;
            } if (typeof data.mobile == "undefined") {
                data.mobile = user.mobile;
            }
            super.query("UPDATE user SET name = ?, email = ?, mobile = ?, type = ? WHERE user_id = ?",
                [data.name, data.email, data.mobile, data.type, userId], callback);
        });
    }
    changePassword(userId: number, data, callback) {
        let user;
        this.getUser(userId, (status, data) => {
            user = data[0];
            let oldHash = user.hash;
            let oldSalt = user.salt;
            let okPassword = compareHash(oldHash, data.oldPassword, oldSalt);
            if (okPassword) {
                let newData = hash(data.newPassword);
                let newHash = newData.hash;
                let newSalt = newData.salt;
                super.query("UPDATE user SET  hash = ?, salt = ? WHERE user_id = ?",
                    [newHash, newSalt, userId], callback);
            }
            else {
                callback.sendStatus(403); //Forbidden
            }
        });
    }
    changePicture(userId: number, data, callback) {
        super.query("UPDATE user SET  picture = ? WHERE user_id = ?", [data.picture, userId], callback);
    }

    // Deletes a user by its id
    deleteUser(userId: number, callback) {
        super.query("DELETE FROM user WHERE user_id=?", [userId], callback)
    }
};
