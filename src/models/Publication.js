const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

module.exports = mongoose.model('Publication', PublicationSchema);

