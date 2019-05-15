const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useFindAndModify', false);
const multer = require('multer');
const {requireAuthentication} = require('../../src/components/Auth/Auth');

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

//Require authentication for all post endpoints
//next() call is in requireAuthentication function.
router.use(function (req, res, next){
    requireAuthentication(req,res,next);
});

//Get all posts
router.get('/',(req, res, next) => {
    Post.find({},(err, post) => {
      if(err) {
            return res.status(500).send(err);
        }
        else {
            post.sort(function(a,b){
                return b.updated - a.updated;
            });
            res.status(200).send(post);
        }
    });
});

//return a new comment id
router.get('/AComment',(req, res, next) => {
    const newID = new mongoose.Types.ObjectId();
    res.status(200).send(newID)
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
    //console.log(req.file);
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
        await post.save().catch(error=>{
            return res.send(error);
        });

        //Associates the comment with a Post
        user.posts.push(post._id);

        //Save the post (so post is now in posts array)
        await user.save().catch(error=>{
            return res.status(500).send(error);
        });
        return res.send(post);
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
        await post.save().catch(error=>{
            return res.send(error);
        });
        //Associates the comment with a Post
        user.posts.push(post._id);
        //Save the post (so post is now in posts array)
        await user.save().catch(error=>{
            return res.send(error);
        });
        res.send(post);
    }
});


//Get all a user's posts (NOT POSTIDS, this is actual posts)
router.get('/getUserPosts/:userId',(req,res,next)=>{
    const Uid = req.params.userId;
    Post.find({userid: Uid}, (err, posts) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            posts.sort(function(a,b){
                return b.updated - a.updated;
            });
            res.status(200).send({
                messages: posts
            });
        }
    });
});

//Get all a user's posts, sorted by "likesupdated" field
router.get('/getUserPostsLikesInt/:userId',(req,res,next)=>{
    const Uid = req.params.userId;
    Post.find({userid: Uid,
               likesupdated: {$ne: null}}, (err, posts) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            //comparefunction(a,b) < 0 means a comes before b
            //comparefunction(a,b) > 0 means b comes before a
            //more recent date is greater i.e. recent-old > 0
            posts.sort(function(a,b){
                return b.likesupdated - a.likesupdated;
            });
            res.status(200).send({
                messages: posts
            });
            Post.update({userid: Uid,
                       likesupdated: {$ne: null}},
                       {$set: {numNewLikes: 0,
                                newLikes: false}},
                        {multi: true},
                        function(err, res){
                            if(err){
                                return res.status(500).send(err);
                            }
                            else{
                                return
                            }
                        });
        }
    });
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
    console.log("made it into patch");
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
            /*
            Comment.remove({ "post": Pid }, (err, comment) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {*/
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
//                }
//            });
        }
    });
});

//Like a post
//Note - can currently like own post
router.post('/like/:userId/:postId', (req, res, next) => {
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
                success: false
            });
            //unlike. incomplete. Also need to update likesscreen when unlike.
            //Would need to update card as well (probably)
            /*Post.updateOne({ "_id" : Pid}, {$pull: { likes: Uid},
                                            $set: {likesupdated: new Date()}},
                                            (err, post) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    Post.findOne({_id: Pid}, (err, likedpost) => {
                        if(err) {
                            return res.status(500).send(err);
                        }
                        else {
                            res.status(200).send(likedpost);
                        }
                    });
                }
            });*/
         }
        else {
            //Like the post
            Post.updateOne({ "_id" : Pid}, {$push: { likes: Uid},
                                            $set: {likesupdated: new Date(),
                                                    newLikes: true},
                                            $inc: {numNewLikes: 1}},
                                            (err, post) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    /*Do this is you need the updated post
                    Post.findOne({_id: Pid}, (err, likedpost) => {
                        if(err) {
                            return res.status(500).send(err);
                        }
                        else {
                            res.status(200).send(likedpost);
                        }
                    });*/
                    res.status(200).send();
                }
            });
        }
    });
});

//Comment on a post
router.post('/:postId/:userId/addComment', async(req, res) =>{
    //Find any one post to comment on
    //const user = await User.findOne({_id: req.params.userId});
    //const post = await Post.findOne({_id: req.params.postId});
    const Pid = req.params.postId;
    const Uid = req.params.userId;
    Post.updateOne({ "_id" : Pid}, {$push: { comments: {
                                                _id: req.body.commentid,
                                                userid: Uid,
                                                username: req.body.username,
                                                content: req.body.content,
                                                created: new Date()
                                            }}},(err, post) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            Post.findOne({_id: Pid}, (err, commentedpost) => {
                if(err) {
                    return res.status(500).send(err);
                }
                else {
                    return res.status(200).send(commentedpost);
                }
            });
        }
    });
});

//lIKE A Comment
router.post('/likeComment/:userId/:postId/:commentId', (req, res, next) => {
    //Find comment to like
    const Pid = req.params.postId;
    const Uid = req.params.userId;
    const Cid = req.params.commentId;
    Post.findOne({_id: Pid}, (err, holdingPost) => {
        if(err) {
            return res.status(500).send(err);
        }
        else {
            let liked = true;
            holdingPost.comments.find((comment)=>{
                if(comment._id == Cid){   //Liked comment
                    comment.likes.find((likedID) =>{
                        if(likedID == Uid)
                            liked = false;  //User hasn't liked it yet
                    })
                    if(liked){
                        comment.likes.push(Uid);
                    }
                    else{
                        return res.status(401).json({
                            success: false
                        });
                    }
                }
            })
            if(liked){
                Post.updateOne({ "_id" : Pid}, {$set: { comments: holdingPost.comments}},
                                                (err, post) => {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.status(200).send();
                    }
                });
            }
        }
    });
});

//Create a comment on a post
/*UNUSED VER
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
    await comment.save().catch(error=>{
        return res.send(error);
    });;
    //Associates the comment with a Post
    post.comments.push(comment._id);
    //Update interacted time on Post
    post.interactedTime = new Date();
    //Save the post (so comment is now in comments array)
    await post.save().catch(error=>{
        return res.send(error);
    });;
    res.send(comment);
});
*/
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
