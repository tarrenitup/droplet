const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        ref: 'User',
        required: 'Username is required'
    },
    content: {
        type: String
    },
    postImage: {
        type: String,
        default: undefined
    },
//    splash_rad: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: 'Comment is required'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: "Point",
            required: true
        },
        coordinates: {
            type: [],
            required: true
        }
    }
});

postSchema.pre('remove', function(next) {
    // Remove all the comment docs that reference the removed post.
    postSchema.remove({ comments: this._id });
});

postSchema.post('remove', function(next){
  console.log({ comments: this._id });
  postSchema.remove({ comments: this._id });
});

module.exports = mongoose.model('Post', postSchema);
