const sjcl = require('sjcl')

export function hash(data: string) {
    var salt = sjcl.random.randomWords(32);
    var saltstring = sjcl.codec.base64.fromBits(salt);
    return {
        hash: sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(data+saltstring)),
        salt: sjcl.codec.base64.fromBits(salt)
    };
}

export function compareHash(hash: string, data: string, salt: string) {
    var newHash = sjcl.codec.base64.fromBits(sjcl.hash.sha256.hash(data + salt));
    return hash == newHash;
}