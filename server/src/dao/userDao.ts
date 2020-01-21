const daoParentUser = require("./dao");
import { compareHash, hash } from "../hashing";
//const User = require("./User.ts");

export interface user {
  user_id: number;
  name: string;
  mobile: number;
  email: string;
  hash: string;
  salt: string;
  type: string;
  picture: Buffer;
}

export function sanitizeUser(data) {
  if (!data) return;
  if (data["hash"]) delete data["hash"];
  if (data["salt"]) delete data["salt"];

  return data;
}

export default class userDao extends daoParentUser {
  constructor(pool) {
    super(pool);
  }

  // Gets all users
  getAllUsers(callback) {
    super.query(
      "SELECT user_id, name, email, mobile, type, picture FROM user",
      [],
      callback
    );
  }

  // Gets a user by its id
  getUser(userId: number, callback) {
    super.query(
      "SELECT user_id, name, email, mobile, type, picture FROM user WHERE user_id = ?",
      [userId],
      callback
    );
  }
  // Gets a user by its name
  getUserByName(artistName: string, callback) {
    super.query(
      "SELECT name, email, picture FROM user WHERE name = ?",
      [artistName],
      callback
    );
  }

  getUserByEMail(email: string, callback) {
    super.query(
      "SELECT user_id, name, email FROM user WHERE email = ?",
      [email],
      callback
    );
  }
  /*
  // Gets a user by its mail
  getUserByEMail(email: string, callback) {
    super.query(
      "SELECT user_id, name, email FROM user WHERE email = ?",
      [email],
      callback
    );
  } */
  getUserAllInfoByEMail(email: string, callback) {
    super.query(
      "SELECT user_id, name, email, mobile, type, picture FROM user WHERE email = ?",
      [email],
      callback
    );
  }

  // Gets all users of a type
  getUsersOfType(type: string, callback) {
    super.query(
      "SELECT user_id, name, email, mobile, type, picture FROM user WHERE type = ?",
      [type],
      callback
    );
  }

  // Gets the hash of a user
  getHashOfUser(email: string, callback) {
    super.query(
      "SELECT hash, salt FROM user WHERE email = ?",
      [email],
      callback
    );
  }

  // Gets the organizer for an event
  getOrganizerForEvent(eventId: number, callback) {
    super.query(
      "SELECT user.user_id, user.name FROM user, event WHERE event.event_id = ? AND event.organizer = user.user_id",
      [eventId],
      callback
    );
  }

  // Gets all artists for an event
  getArtistsForEvent(eventId: number, callback) {
    super.query(
      "SELECT user.user_id, user.name, user.picture FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'artist'",
      [eventId],
      callback
    );
  }

  // Gets all volunteers for an event
  getVolunteersForEvent(eventId: number, callback) {
    super.query(
      "SELECT user.name, user.picture FROM user, user_event WHERE user_event.event_id = ? AND user_event.user_id = user.user_id AND user.type = 'volunteer'",
      [eventId],
      callback
    );
  }

  // Adds a user
  addUser(data: user, callback) {
    super.query(
      "INSERT INTO user VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.email,
        data.mobile,
        data.hash,
        data.salt,
        data.type,
        data.picture
      ],
      callback
    );
  }

  // Updates a user
  updateUser(userId: number, data: user, callback) {
    let user;
    this.getUser(userId, (status, olddata) => {
      user = olddata[0];
      if (typeof data.name == undefined) {
        data.name = user.name;
      }
      if (typeof data.email == undefined) {
        data.email = user.email;
      }
      if (typeof data.type == undefined) {
        data.type = user.type;
      }
      if (typeof data.mobile == undefined) {
        data.mobile = user.mobile;
      }
      if (typeof data.picture == undefined) {
        data.picture = user.picture;
      }
      super.query(
        "UPDATE user SET name = ?, email = ?, mobile = ?, type = ?, picture = ? WHERE user_id = ?",
        [data.name, data.email, data.mobile, data.type, data.picture, userId],
        callback
      );
    });
  }
  resetPassword(email: string, data: user, callback) {
    let user;
    this.getHashOfUser(email, (status, olddata) => {
      user = olddata[0];
      let newHash = data.hash;
      let newSalt = data.salt;
      super.query(
        "UPDATE user SET  hash = ?, salt = ? WHERE email = ?",
        [newHash, newSalt, email],
        callback
      );
    });
  }
  changePassword(email: string, data, callback) {
    let user;
    this.getHashOfUser(email, (status, olddata) => {
      user = olddata[0];
      let oldHash = user.hash;
      let oldSalt = user.salt;
      let okPassword = compareHash(oldHash, data.oldPassword, oldSalt);
      if (okPassword) {
        let newData = hash(data.newPassword);
        let newHash = newData.hash;
        let newSalt = newData.salt;
        super.query(
          "UPDATE user SET  hash = ?, salt = ? WHERE email = ?",
          [newHash, newSalt, email],
          callback
        );
      } else {
        callback.sendStatus(403); //Forbidden
      }
    });
  }
  changePicture(userId: number, data, callback) {
    super.query(
      "UPDATE user SET  picture = ? WHERE user_id = ?",
      [data.picture, userId],
      callback
    );
  }

  // Deletes a user by its id
  deleteUser(userId: number, callback) {
    super.query("DELETE FROM user WHERE user_id=?", [userId], callback);
  }
}
