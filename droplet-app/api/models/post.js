const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    text: String,
    created: Date
});

module.exports = mongoose.model('Post', postSchema);