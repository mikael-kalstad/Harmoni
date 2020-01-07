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

    getOrganizers(callback){
        super.query("SELECT * FROM user WHERE type = 'organizer'", [], callback)
    }

    getManagers(callback){
        super.query("SELECT * FROM user WHERE type = 'manager'", [], callback);
    }

    getVolunteers(callback){
        super.query("SELECT * FROM user WHERE type = 'volunteer'", [], callback);
    }

    getHashOfUser(userId: number, callback){
        super.query("SELECT hash FROM user WHERE user_id = ?", [userId], callback)
    }

    addUser(user, callback){
        super.query("INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)", [user.name, user.email, user.hash, user.salt, user.type, user.picture], callback);
    }

    updateUser(userId: number, user, callback){
        super.query("UPDATE user SET name = ?, email = ?, hash = ?, salt = ?, type = ?, picture = ? WHERE user_id = ?", [user.name, user.email, user.hash, user.salt, user.type, user.picture, userId], callback);
    }
    deleteUser(userId: number, callback){
        super.query("DELETE FROM user WHERE user_id=?", [userId], callback)
    }
};
