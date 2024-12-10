const mongoose = require('mongoose');
const {User} = require('./User.js');

const PublicationSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: User},
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Publication', PublicationSchema);