const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const nodePacksSchema = new Schema ({ 
        _id: String,
        packs: [String]
});

module.exports = mongoose.model('nodePack', nodePacksSchema, 'nodePacks');