var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadSchema = new Schema({
    nickname: String,
    title: String,
    description: String,
    coords: {
        lat: Number,
        lon: Number
    }
});

module.exports = mongoose.model('Thread', ThreadSchema);
