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
};
