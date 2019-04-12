const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useFindAndModify', false);
const multer = require('multer');

//Create local directory to save pictures in
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

//Set max file upload size to 5 MB
const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});

//Models
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

//Get all posts
router.get('/', (req, res, next) => {
    Post.find({},(err, post) => {
      if(err) {
            return res.status(500).send(err);
        }
        else {
            res.status(200).send(post);
        }
    });
});

//Get all posts within 10 meters
router.get('/nearby', (req, res, next) => {
    //url ex: 'localhost:3000/posts/nearby?lng=32.23&lat=32.32&meters=100000
    //maxDistance is in meters
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var meters = parseFloat(req.query.meters);
//    console.log(lng);
//    console.log(lat);
    //Find posts
    Post.aggregate([
        {
            $geoNear: {
                //Find the location from given coords.
                near: { type: "Point", coordinates: [lng, lat] },
                distanceField: "dist.calculated",
                key: "location",
                includeLocs: "dist.location",
                maxDistance: meters,
                spherical: true
            }
        }
    ])
    .then(function(posts){
        res.send(posts);
    })
    .catch(next)
});

//Create a post
router.post('/:userId', upload.single('postImage'), async (req, res, next) => {
    //Get photo to upload
    console.log(req.file);

    //Find any one user to post on
    const user = await User.findOne({_id: req.params.userId});

    //If file found, upload post accordingly
    if(req.file != undefined) {
        //Create new post with image
        const post = new Post();
        post._id = new mongoose.Types.ObjectId();
        post.userid = user._id;
        post.username = user.username;
        post.content = req.body.content;
        post.postImage = req.file.path;
        post.location = req.body.location;
        //Save it
        await post.save()

        //Associates the comment with a Post
        user.posts.push(post._id);

        //Save the post (so post is now in posts array)
        await user.save();
        res.send(post);
    }
    //If no file found, upload content only
    else {
        //Create new post without image
        const post = new Post();
        post._id = new mongoose.Types.ObjectId();
        post.userid = user._id;
        post.username = user.username;
        post.content = req.body.content;
        post.postImage = undefined;
        post.location = req.body.location;
        //Save it
        await post.save()

        //Associates the comment with a Post
        user.posts.push(post._id);

        //Save the post (so post is now in posts array)
        await user.save();
        res.send(post);
    }
});

//Return one specific post
router.get('/:postId', (req, res, next) => {

    //Get ID of post to return
    const Pid = req.params.postId;

    //Find the post
    Post.find({_id: Pid}, (err, post) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            res.status(200).send(post);
        }
    });
});

//Update a user's post
router.patch('/:postId',(req, res, next) => {

    //Get id of post to update
    const Pid = req.params.postId;

    //Update list
    const updateOps = {};

    //Update content field of a post
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    //Updated date field
    Post.updated = new Date();
    Post.update({_id: Pid}, {$set: updateOps})
    .exec()
    //Update successful
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    //Update unsuccessful
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Delete the post of a user
router.delete('/:postId', (req, res, next) => {

    //Get id of post to delete
    const Pid = req.params.postId;

    //Remove post
    Post.findByIdAndRemove(Pid, (err, post) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            //Remove comments associated with the post
            Comment.remove({ "post": Pid }, (err, comment) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    //Remove post from user post array
                    User.update({}, {$pull: { posts: Pid }}, (err, user) => {
                        if(err) {
                            return res.status(500).send(err);
                        }
                        else {
                            res.status(200).send({
                                message: "Post and its comments successfully deleted",
                                id: user._id
                            });
                        }
                    });
                }
            });
        }
    });
});

//Like a post
router.post('/:userId/:postId/like', (req, res, next) => {
    //Find post to like
    const Pid = req.params.postId;
    const Uid = req.params.userId;

    //Check if user has already liked the post
    Post.find( { "_id" : Pid, likes: {$in: [Uid] }  }, (err, post) => {
        if(err) {
            return res.status(500).send(err);
        }
        //Already liked the post
        else if(post.length > 0 ) {
            return res.status(401).json({
                success: "You have already liked this post!"
            });
         }
        else {
            //Like the post
            Post.updateOne({ "_id" : Pid}, {$push: { likes: Uid}}, (err, post) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    Post.likesupdated = new Date();
                    return res.status(200).json({
                        success: 'You have liked this post!',
                        likesupdated: likesupdated
                    });
                }
            });
        }
    });
});

//Create a comment on a post
router.post('/:userId/:postId/comment', async (req, res) => {

    //Find any one post to comment on
    const user = await User.findOne({_id: req.params.userId});
    const post = await Post.findOne({_id: req.params.postId});

    //Create a new comment
    const comment = new Comment();

    //Grab comment content and postId as described in comment.js
    comment.username = user.username;
    comment.content = req.body.content;
    comment.post = post._id;
    comment.uid = user._id;

    //save the comment
    await comment.save();

    //Associates the comment with a Post
    post.comments.push(comment._id);

    //Save the post (so comment is now in comments array)
    await post.save();
    res.send(comment);
});

//Read all comments on a post
router.get('/getcomments/:postId', async (req, res) => {

    /*Get post and populate comment
    section with comments tied to post*/
   const post = await Post.findOne({_id: req.params.postId}).populate('comments');
   res.send(post);
});

//Delete a single comment from a post
router.delete('/:commentId', (req, res, next) => {

    //Get id of post to delete
    //const Uid = req.params.userId;
    //const Pid = req.params.postId;
    const Cid = req.params.commentId;

    //Remove comment
    Comment.findByIdAndRemove(Cid, (err, post) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            //Remove comment from post comment array
            Post.update({}, {$pull: { comments: Cid }}, (err, post) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    res.status(200).send({
                        message: "Comment successfully deleted",
                        id: post._id
                    });
                }
            });
        }
    });
});

//Update the content of a comment
router.patch('/:commentId',(req, res, next) => {

    //Get id of comment to update
    const Cid = req.params.commentId;

    //Update list
    const updateOps = {};

    //Update content field of a post
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    //Updated date field
    Comment.updated = new Date();
    //Update comment
    Comment.updateOne({_id: Cid}, {$set: updateOps})
    .exec()
    //Update successful
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    //Update unsuccessful
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
