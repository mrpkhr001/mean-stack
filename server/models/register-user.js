const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const registerUserSchema = new Schema  ({
    _id: String,
    name: String,
    password: String,
    enrollmentSecret: String
});

module.exports = mongoose.model('registeredUser', registerUserSchema, 'registeredUsers');
