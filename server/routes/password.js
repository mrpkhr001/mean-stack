'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(){
    var length = 16
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

var passwordMatched = function (userpassword, passwordData) {

    var newPasswordData = sha512(userpassword, passwordData.salt);
    if (newPasswordData.passwordHash === passwordData.passwordHash) {
      return true;
    }

    return false;
}

module.exports = {genRandomString :genRandomString , sha512 : sha512, passwordMatched: passwordMatched};
