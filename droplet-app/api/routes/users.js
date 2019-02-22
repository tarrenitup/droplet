const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useFindAndModify', false);
const multer = require('multer');

//Create local directory to save pictures on
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

//Set max file upload size to 5 MB
const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
}});

//Models
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

//Read all users
router.get('/',(req, res, next) => {
    //Fetch all users
    User.find()
    .exec()
    //Get users successful
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    //Get users unsuccessful
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Create a user
router.post('/signup',(req, res, next) => {

    //encrypt password
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
            return res.status(500).json({
                error: err
            });
        }
        else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            user
            .save()
            .then(function(result){
                console.log(result);
                res.status(200).json({
                    success: 'New User has been created!'
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

//User signin
router.post('/signin', function(req, res){
    //Find user to signin
    User.findOne({username: req.body.username})
    .exec()
    .then(function(user){
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(err){
                return res.status(401).json({
                    failed: 'Failed to Login: Username not found'
                });
            }
            if(result){
                return res.status(200).json({
                    success: 'Welcome to Droplet!'
                });
            }
            return res.status(401).json({
                failed: 'Failed to login'
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

//Read the posts of a user
router.get('/getposts/:userId', (req, res, next) => {
    //Get id of user
    const id = req.params.userId;
    User.findById(id)
    .exec()
    //Get successful
    .then(doc =>{
        console.log(doc);
        //Found user id
        if(doc){
            res.status(200).json(doc);
        }
        //Cannot find user id
        else {
            res.status(404).json({message: 'No valid user for given ID'});
        }
    })
    //Get unsuccessful
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Create a post
router.post('/createpost/:userId', upload.single('postImage'), async (req, res, next) => {
    //Get photo to upload
    console.log(req.file);

    //Find any one user to post on
    const user = await User.findOne({_id: req.params.userId});

    //If file found, upload post accordingly
    if(req.file != undefined){
        //Create new post with image
        const post = new Post();
        post._id = new mongoose.Types.ObjectId();
        post.userID = user._id;
        post.username = user.username;
        post.content = req.body.content;
        post.postImage = req.file.path;
        await post.save()

        //Associates the comment with a Post
        user.posts.push(post._id);

        //Save the post (so post is now in posts array)
        await user.save();
        res.send(post);
    }
    //If no file found, upload content only
    else{
        //Create new post with image
        const post = new Post();
        post._id = new mongoose.Types.ObjectId();
        post.userID = user._id;
        post.username = user.username;
        post.content = req.body.content;
        post.postImage = undefined;
        await post.save()

        //Associates the comment with a Post
        user.posts.push(post._id);

        //Save the post (so post is now in posts array)
        await user.save();
        res.send(post);
    }
});

//Update a user's post
router.patch('/updatepost/:postId',(req, res, next) => {

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
router.delete('/deletepost/:postId', (req, res, next) => {

    //Get id of post to delete
    const Uid = req.params.userId;
    const Pid = req.params.postId;

    //Remove post
    Post.findByIdAndRemove(Pid, (err, post) => {
        if(err){
            return res.status(500).send(err);
        }
        else {
            //Remove comments associated with the post
            Comment.findOneAndRemove( { "post": Pid }, (err, comment) => {
                if(err){
                    return res.status(500).send(err);
                }
                else {
                    //Remove post from user post array
                    User.update({}, {$pull: { posts: Pid }}, (err, user) => {
                        if(err){
                            return res.status(500).send(err);
                        }
                        else{
                            res.status(200).send({
                                message: "Post and its comments successfully deleted",
                                id: user._id
                            });
                        }
                    })
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

    //Get post and populate comment
    //section with comments tied to post
   const post = await Post.findOne({_id: req.params.postId}).populate('comments');
   res.send(post);
});

//Delete a single comment from a post
router.delete('/deletecomment/:userId/:postId/:commentId', (req, res, next) => {

    //Get id of post to delete
    const Uid = req.params.userId;
    const Pid = req.params.postId;
    const Cid = req.params.commentId;

    //Remove comment
    Comment.findByIdAndRemove(Cid, (err, post) => {
        if(err){
            return res.status(500).send(err);
        }
        else {
            //Remove comment from post comment array
            Post.update({}, {$pull: { comments: Cid }}, (err, post) => {
                if(err){
                    return res.status(500).send(err);
                }
                else{
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
router.patch('/updatecomment/:userId/:postId/:commentId',(req, res, next) => {

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
