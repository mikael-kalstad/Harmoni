/**
 * This class used to hash and salt password for users,
 * sjcl is the stanford Javascript Crypto Library
  */

const sjcl = require('sjcl')

export function hash(data: string) {
    var salt = sjcl.random.randomWords(32);
    var saltstring = sjcl.codec.base64.fromBits(salt);
    return {
        hash: sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(data + saltstring)),
        salt: sjcl.codec.base64.fromBits(salt)
    };
}

// This method is used when the user logs in
export function compareHash(hash: string, data: string, salt: string) {
    var newHash = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(data + salt));
    return hash == newHash;
}