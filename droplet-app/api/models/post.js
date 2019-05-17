const mongoose = require('mongoose');

//const pointSchema = new mongoose.Schema({
//    type: {
//        type: String,
//        enum: ['Point'],
//        default: 'Point',
//        required: true
//    },
//    coordinates: {
//        type: [Number],
//        index: '2dsphere',
//        required: true
//    }
//});

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
    splash_rad: Number,
/*
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: 'Comment is required'
    }],*/
    comments: [{
        //Apparently comment id gets included automatically?
        username: {
            type: String,
            ref: 'User',
            required: 'Username is required'
        },
        userid: mongoose.Schema.Types.ObjectId,
        content: {
            type: String,
            required: 'Content is required'
        },
        created: {
            type: Date,
            default: Date.now
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }]
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likesupdated: {
        type: Date,
        default: undefined
    },
    numNewLikes:{
        type: Number,
        default: 0
    },
    newLikes:{
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            //required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            //required: true
        }
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

postSchema.index({location: "2dsphere"});

module.exports = mongoose.model('Post', postSchema);
//module.exports = mongoose.model('Point', pointSchema);
