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
            user.save()
            .then(function(result){
                return generateJWT(result._id,result.username);
            })
            .then(function(token){
                res.status(200).json({ //consider sending in additional information i.e. user id?
                    token : token
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
            return generateJWT(user._id,user.username);
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
//get a user's bio by id
router.get('/getBio/:userId', (req, res, next) => {
    //Get id of user
    const Uid = req.params.userId;
    User.findById({ _id: Uid }, function(err, user) {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            res.status(200).send({
                bio: user.bio
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

//BUILD DEMO USERS
router.post('/demo', async (req, res, next) => {

    //First, deletes all Users
    User.deleteMany({})
    .then(function(result) {
        console.log("Demo users Cleaned!");
        //res.send("Demo users Cleaned!");
    });
    //Second, deletes all comments
    Post.deleteMany({})
    .then(function(result) {
        console.log("Demo posts Cleaned!");
        res.send("Demo posts Cleaned!");
    });

    //Create all Demo Users
    //All use the password "querty123"
    const pword = "qwerty123";
    bcrypt.hash(pword, 10, function(err, hash){
        var user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Amelia",
            password: hash,
            bio: "I LOVE the farmers markets on Wednesdays and Saturdays down by the water front!"
        });
        user
        .save()
        .then(function(result){
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Ava",
            password: hash,
            bio: "Adventurous soul looking for new hiking buddies!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Ben",
            password: hash,
            bio: "I love going to pubs and breweries around town."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Charlotte",
            password: hash,
            bio: "Just a senior grad student trying to survive!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Elias",
            password: hash,
            bio: "An adventurous engineering student that enjoys hiking and biking."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Elijah",
            password: hash,
            bio: "I love cars and walking my dogs around parks and beaches."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Emilia",
            password: hash,
            bio: "Live in the city and looking for adventure!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Emma",
            password: hash,
            bio: "I enjoy walking in forests and hammock naps."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Evelyn",
            password: hash,
            bio: "Camping and hiking in the mountains are the best!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Ezra",
            password: hash,
            bio: "I enjoy hiking, mountain biking, snowboarding, and soccer. Let's do something!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Harper",
            password: hash,
            bio: "I enjoy hiking, mountain biking, snowboarding, and soccer. Let's do something!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Issabella",
            password: hash,
            bio: "Biking around Corvallis is my JAM!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "James",
            password: hash,
            bio: "Looking to explore Oregon's forests and natural beauty."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Leo",
            password: hash,
            bio: "Just a guy who loves photography and exploring."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Liam",
            password: hash,
            bio: "Probably the most outdoorsy guy you'll meet."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Logan",
            password: hash,
            bio: "Portland native who loves Powell's and hiking trails."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Luke",
            password: hash,
            bio: "Just bought a new camera and looking for cool places!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Mason",
            password: hash,
            bio: "Once you go rafting you never turn back."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Mia",
            password: hash,
            bio: "The beach is the best. Change my mind."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Noah",
            password: hash,
            bio: "Born and raised Lincoln City."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Oliver",
            password: hash,
            bio: "I love music, camping and traveling with friends."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Olivia",
            password: hash,
            bio: "I love Portland!! Let's go explore!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Sawyer",
            password: hash,
            bio: "Grew up outside; I love pretty much any outdoor activity."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Sophia",
            password: hash,
            bio: "Just looking for a distraction from school. This seems fun!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Will",
            password: hash,
            bio: "Snowboarding is love, snowboarding is life."
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    bcrypt.hash(pword, 10, function(err, hash){
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: "Willow",
            password: hash,
            bio: "You'll always see me looking at sunrises/sunsets. Too beautiful!"
        });
        user
        .save()
        .then(function(result){
            console.log(result);
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
    });

    const p1 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Amelia",
        content: "I LOVE the farmers markets on Wednesdays and Saturdays down by the water front!",
        postImage: "../../images/amelia_farmers.jpg",
        location: {type: "Point", coordinates: [-123.259,44.563]}
    });
    if(p1){
        var user = await User.findOne({username: "Amelia"});
        await p1.save();
        user.posts.push(p1._id);
        user.save();
        //res.send(p1);
    }

    const p2 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Ava",
        content: "yummmmmmm",
        postImage: "../../images/ava_steak.jpg",
        location: {type: "Point", coordinates: [-123.262,44.562]}
    });
    if(p2){
        var user = await User.findOne({username: "Ava"});
        await p2.save();
        user.posts.push(p2._id);
        await user.save();
        //res.send(p2);
    }

    const p3 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Ben",
        content: "Look at this beaut!",
        postImage: "../../images/ben_burger.jpg",
        location: {type: "Point", coordinates: [-123.259,44.565]}
    });
    if(p3){
        var user = await User.findOne({username: "Ben"});
        await p3.save();
        user.posts.push(p3._id);
        await user.save();
        //res.send(p3);
    }

    const p4 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Charlotte",
        content: "Basically living on the 5th floor of the library. I can't wait to be done with finals.",
        location: {type: "Point", coordinates: [-123.276,44.565]}
    });
    if(p4){
        var user = await User.findOne({username: "Charlotte"});
        await p4.save();
        user.posts.push(p4._id);
        await user.save();
        //res.send(p4);
    }

    const p5 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Elias",
        content: "So many great projects at the Expo this year. Especially the Droplet team!",
        location: {type: "Point", coordinates: [-123.279,44.567]}
    });
    if(p5){
        var user = await User.findOne({username: "Elias"});
        await p5.save();
        user.posts.push(p5._id);
        await user.save();
        //res.send(p5);
    }

    const p6 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Elijah",
        content: "Check out my new ride!",
        postImage: "../../images/elijah_vw.jpg",
        location: {type: "Point", coordinates: [-123.291,44.557]}
    });
    if(p6){
        var user = await User.findOne({username: "Elijah"});
        await p6.save();
        user.posts.push(p6._id);
        await user.save();
        //res.send(p6);
    }

    const p7 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Emilia",
        content: "Starbuck believes he is the king of the house. He is.",
        postImage: "../../images/emilia_cat.jpg",
        location: {type: "Point", coordinates: [-123.292,44.559]}
    });
    if(p7){
        var user = await User.findOne({username: "Emilia"});
        await p7.save();
        user.posts.push(p7._id);
        await user.save();
        //res.send(p7);
    }

    const p8 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Emma",
        content: "Happy to go home for the summer, but sad to leave.. Bye Oregon :(",
        postImage: "../../images/emma_pdx.jpg",
        location: {type: "Point", coordinates: [-122.559,45.590]}
    });
    if(p8){
        var user = await User.findOne({username: "Emma"});
        await p8.save();
        user.posts.push(p8._id);
        await user.save();
        //res.send(p8);
    }

    const p9 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Evelyn",
        content: "CaNOTTT wait for summer. I don't like having to do homework with this amazing sunny whether. Not fair.",
        location: {type: "Point", coordinates: [-123.280,44.564]}
    });
    if(p9){
        var user = await User.findOne({username: "Evelyn"});
        await p9.save();
        user.posts.push(p9._id);
        await user.save();
        //res.send(p9);
    }

    const p10 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Ezra",
        content: "Two hour classes should be outlawed",
        location: {type: "Point", coordinates: [-123.279,44.566]}
    });
    if(p10){
        var user = await User.findOne({username: "Ezra"});
        await p10.save();
        user.posts.push(p10._id);
        await user.save();
        //res.send(p10);
    }

    const p11 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Harper",
        content: "Hitting the saddle this morning!",
        postImage: "../../images/harper_mtnbike.jpg",
        location: {type: "Point", coordinates: [-123.336,44.637]}
    });
    if(p11){
        var user = await User.findOne({username: "Harper"});
        await p11.save();
        user.posts.push(p11._id);
        await user.save();
        //res.send(p11);
    }

    const p12 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Issabella",
        content: "Those whitewall bicycle tires though",
        postImage: "../../images/issabella_bike.jpg",
        location: {type: "Point", coordinates: [-123.272,44.556]}
    });
    if(p12){
        var user = await User.findOne({username: "Issabella"});
        await p12.save();
        user.posts.push(p12._id);
        await user.save();
        //res.send(p12);
    }

    const p13 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "James",
        content: "Study break, gotta get out of town for an impromptu adventure!",
        postImage: "../../images/james_waterfall.jpg",
        location: {type: "Point", coordinates: [-122.694,44.394]}
    });
    if(p13){
        var user = await User.findOne({username: "James"});
        await p13.save();
        user.posts.push(p13._id);
        await user.save();
        //res.send(p13);
    }

    const p14 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Leo",
        content: "Saint John's bridge",
        postImage: "../../images/leo_bridge.jpg",
        location: {type: "Point", coordinates: [-122.762,45.587]}
    });
    if(p14){
        var user = await User.findOne({username: "Leo"});
        await p14.save();
        user.posts.push(p14._id);
        await user.save();
        //res.send(p14);
    }

    const p15 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Liam",
        content: "Spring is the best time for down hilling!",
        postImage: "../../images/liam_downhill.jpg",
        location: {type: "Point", coordinates: [-123.372,44.581]}
    });
    if(p15){
        var user = await User.findOne({username: "Liam"});
        await p15.save();
        user.posts.push(p15._id);
        await user.save();
        //res.send(p15);
    }

    const p16 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Logan",
        content: "Guess where I am",
        postImage: "../../images/logan_portlandia.jpg",
        location: {type: "Point", coordinates: [-122.680,45.522]}
    });
    if(p16){
        var user = await User.findOne({username: "Logan"});
        await p16.save();
        user.posts.push(p16._id);
        await user.save();
        //res.send(p16);
    }

    const p17 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Luke",
        content: "Pink",
        postImage: "../../images/luke_flower.jpg",
        location: {type: "Point", coordinates: [-123.284,44.562]}
    });
    if(p17){
        var user = await User.findOne({username: "Luke"});
        await p17.save();
        user.posts.push(p17._id);
        await user.save();
        //res.send(p17);
    }

    const p18 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Mason",
        content: "Back at home in Florence for the weekend",
        postImage: "../../images/mason_cape_creek.jpg",
        location: {type: "Point", coordinates: [-124.107,43.996]}
    });
    if(p18){
        var user = await User.findOne({username: "Mason"});
        await p18.save();
        user.posts.push(p18._id);
        await user.save();
        //res.send(p18);
    }

    const p19 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Mia",
        content: "NO whales :(",
        postImage: "../../images/mia_ocean.jpg",
        location: {type: "Point", coordinates: [-124.074,44.622]}
    });
    if(p19){
        var user = await User.findOne({username: "Mia"});
        await p19.save();
        user.posts.push(p19._id);
        await user.save();
        //res.send(p19);
    }

    const p20 = new Post({
        _id: new mongoose.Types.ObjectId(),
        username: "Noah",
        content: "Just hangin' at the edge of the earth",
        postImage: "../../images/noah_coast.jpg",
        location: {type: "Point", coordinates: [-124.018,44.968]}
    });
    if(p20){
        var user = await User.findOne({username: "Noah"});
        await p20.save();
        user.posts.push(p20._id);
        await user.save();
        //res.send(p20);
    }

    const p21 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Oliver",
            content: "Sing it out",
            postImage: "../../images/oliver_sing.jpg",
            location: {type: "Point", coordinates: [-123.273,44.540]}
        });
        if(p21){
            var user = await User.findOne({username: "Oliver"});
            await p21.save();
            user.posts.push(p21._id);
            await user.save();
            //res.send(p21);
        }

        const p22 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Olivia",
            content: "Such a great night last night!",
            postImage: "../../images/olivia_ptown.jpg",
            location: {type: "Point", coordinates: [-122.671,45.527]}
        });
        if(p22){
            var user = await User.findOne({username: "Olivia"});
            await p22.save();
            user.posts.push(p22._id);
            await user.save();
            //res.send(p22);
        }

        const p23 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Sawyer",
            content: "Side by side on the dunes: the most fun.",
            postImage: "../../images/sawyer_dunes.jpg",
            location: {type: "Point", coordinates: [-124.111,43.914]}
        });
        if(p23){
            var user = await User.findOne({username: "Sawyer"});
            await p23.save();
            user.posts.push(p23._id);
            await user.save();
            //res.send(p23);
        }

        const p24 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Sophia",
            content: "WOO!! I just got through my thesis defense! I'm SO glad its done!",
            location: {type: "Point", coordinates: [-123.281,44.565]}
        });
        if(p24){
            var user = await User.findOne({username: "Sophia"});
            await p24.save();
            user.posts.push(p24._id);
            await user.save();
            //res.send(p24);
        }

        const p25 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Will",
            content: "Snow in the Spring? Yep",
            postImage: "../../images/will_snow.jpg",
            location: {type: "Point", coordinates: [-121.711,45.331]}
        });
        if(p25){
            var user = await User.findOne({username: "Will"});
            await p25.save();
            user.posts.push(p25._id);
            await user.save();
            //res.send(p25);
        }

        const p26 = new Post({
            _id: new mongoose.Types.ObjectId(),
            username: "Willow",
            content: "On my way back into Corvallis",
            postImage: "../../images/willow_sunset.jpg",
            location: {type: "Point", coordinates: [-123.265,44.555]}
        });
        if(p26){
            var user = await User.findOne({username: "Willow"});
            await p26.save();
            user.posts.push(p26._id);
            await user.save();
            //res.send(p26);
        }

});

module.exports = router;
