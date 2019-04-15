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
    }],
    bio: {
        type: String,
        required: true
    }
});

userSchema.pre('remove', function(next) {
    // Remove all the comment docs that reference the removed post.
    userSchema.remove({ posts: post._id });
});

userSchema.post('remove', function(next){
  console.log({ posts: post._id });
  userSchema.remove({ posts: post._id });
});

userSchema.update = function(req, res, next) {
    const password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if(err){
            return next(err);
        }
        req.body.password = hash;
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
            if(err){
                return res.send(err).status(500);
            }
            return res.send(user).status(200);
        });
    });
}

module.exports = mongoose.model('User', userSchema);