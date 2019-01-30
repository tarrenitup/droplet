const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

//Handle GET requests to /posts
router.get('/',(req, res, next) => {
    //Fetch all posts
    Post.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
//    res.status(200).json({
//        message: 'Handling GET requests to /posts'
//    });
});

//Handle POST requests to /posts
router.post('/',(req, res, next) =>{
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        text: req.body.text
    });
    post
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
                message: 'Handling POST requests to /posts',
                createdPost: result
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});

router.get('/:postId',(req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message: 'No valid post for given ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:postId',(req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Post.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:postId',(req, res, next) => {
    const id = req.params.postId;
    Post.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;