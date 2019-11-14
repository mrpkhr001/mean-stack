const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const registerUserSchema = new Schema  ({
    _id: String,
    name: String,
    password: {
      salt: String,
      passwordHash: String,
    },
    enrollmentSecret: String,
    role: String,
    
});

module.exports = mongoose.model('registeredUser', registerUserSchema, 'registeredUsers');
