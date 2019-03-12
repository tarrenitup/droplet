const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: 'Post is required'
    }]
});

userSchema.pre('remove', function(next) {
    // Remove all the comment docs that reference the removed post.
    userSchema.remove({ posts: post._id });
});

userSchema.post('remove', function(next){
  console.log({ posts: post._id });
  userSchema.remove({ posts: post._id });
});

module.exports = mongoose.model('User', userSchema);