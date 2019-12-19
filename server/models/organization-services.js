const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const organizationServiceSchema = new Schema  ({
    _id: String,
    serviceType: String,
    data: [String]
});

module.exports = mongoose.model('organizationService', organizationServiceSchema, 'organizationServices');
