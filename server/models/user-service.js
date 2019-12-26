const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userServiceSchema = new Schema  ({
    _id: String,
    serviceType: String,
    validationMethod: String
});

module.exports = mongoose.model('userService', userServiceSchema, 'userServices');
