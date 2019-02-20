const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: 'Username is required'
    },
    content: {
        type: String,
        required: 'Content is required'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: 'Post is required field'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

commentSchema.pre('remove', function(next) {
    // Remove all the comment docs that reference the removed post.
    commentSchema.remove();
});

commentSchema.post('remove', function(next) {
  commentSchema.remove();
});

module.exports = mongoose.model('Comment', commentSchema);