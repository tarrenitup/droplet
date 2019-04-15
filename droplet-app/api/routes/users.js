const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useFindAndModify', false);
const multer = require('multer');
const {generateJWT, requireAuthentication} = require('../../src/components/Auth/Auth');


//Models
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');


//Get all users
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
router.post('/',(req, res, next) => {

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
                password: hash,
                bio: req.body.bio
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
    if(req.body && req.body.username && req.body.password){
        User.findOne({username: req.body.username})
        .exec()
        .then(function(user){
            if(user){
                return bcrypt.compare(req.body.password, user.password);
            }else{
                return Promise.reject(401);
            }
        }).then(function(loginSucess){
            if(loginSucess){    //JWT generation.
                return User.findOne({username: req.body.username});
            }else{
                return Promise.reject(401);
            }
        }).then(function(user){
            return generateJWT(user._id);
        }).then(function(token){
            res.status(200).json({ //consider sending in additional information i.e. user id?
                token : token
            });
        }).catch(function(error){
            console.log(error);
            if (error === 401){
                res.status(401).json({
                    error: "Username or Password is invalid"
                });
            }else{

                res.status(500).json({
                    error: "Failed to find user"
                });
            }
        });
     }
     else {
        res.status(400).json({
            error: "Invalid request. Needs a username and password"
        });
    }
});

//Update a user's name
router.patch('/:userId',
            requireAuthentication,
            (req, res, next) => {

    //Get id of user to update
    const Uid = req.params.userId;

    //Update list
    const updateOps = {};

    //if passwords are the same, update

    //Update fields of a post
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        User.findOne({_id: Uid})
        .exec()
        .then((user) => {
            //If passwords match, update
            bcrypt.compare(ops.value, user.password, function(err, res) {
                if(res) {
                    //Set new password
                    updateOps[ops.propName] = ops.value;
                    //hash new password
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err) {
                            return res.status(500).json({
                                error: err
                            });
                        }
                        else {
                            //Update user
                            User.update({_id: Uid}, {$set: updateOps})
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
                        }
                    });
                }
                else {
                    //passwords don't match
                    console.log(ops.value);
                }
            });
        });
    }
});


//Get the posts of a user
//Returns array of postId's
router.get('/:userId', (req, res, next) => {
    //Get id of user
    const Uid = req.params.userId;
    User.find({ _id: Uid }, {"_id": 0, "password": 0}, function(err, user) {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            res.status(200).send({
                message: user
            });
        }
    });
});

//get a user's name by id
router.get('/getUserByID/:userId', (req, res, next) => {
    //Get id of user
    const Uid = req.params.userId;
    User.find({ _id: Uid }, function(err, user) {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            res.status(200).send({
                username: user[0].username,
                bio: user[0].bio
            });
        }
    });
});

//Delete a user
router.delete('/:userId',
            requireAuthentication,
            (req, res) => {

    //Get id of user to delete
    const Uid = req.params.userId;
    //Find the user
    User.findOne({_id: Uid})
    .exec()
    .then((user) => {
        var i = 0;
        //console.log(user.posts.length);
        for(i = 0; i < user.posts.length; i++) {
            //Delete all comments on posts
            Comment.deleteMany({post: user.posts[i]._id}, (err, comment) => {
            })
        }
    })
    .then((user)=> {
        //Delete all user posts
        Post.deleteMany({ userid: Uid }, (err, post) => {
            if(err) {
                return res.status(500).json({
                    error: err
                });
            }
            else {
                //Delete user
                User.deleteOne({ _id: Uid}, (err, user) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 'User and all associated content deleted!'
                        });
                    }
                });
            }
        });
    })
});

module.exports = router;
