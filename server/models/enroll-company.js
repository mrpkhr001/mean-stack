const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const companyEnrollSchema = new Schema  ({
    enrollmentSecret: String,
    companyName: String,
    companyAddress: String,
    country: String,
    phone: String,
    website: String,
    packs: [String]
});

module.exports = mongoose.model('enrollCompany', companyEnrollSchema, 'enrolledCompanies');
