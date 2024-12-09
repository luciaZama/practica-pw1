const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true,
    },
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