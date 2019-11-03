const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const packSchema = new Schema ({ 
        _id: String,
        description:String,
        queries: [{
            _id:String,
            query:String,
            description:String,
            interval:Number
        }]
    });

module.exports = mongoose.model('pack', packSchema, 'packs');