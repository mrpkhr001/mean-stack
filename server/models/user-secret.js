const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSecretSchema = new Schema  ({
    _id: String,
    secret: String,    
});

module.exports = mongoose.model('userSecret', userSecretSchema, 'userSecret');
