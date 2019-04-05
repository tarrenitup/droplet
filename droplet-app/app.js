const express = require('express');
const app = express();
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Models
//require('./models/post');
//require('./models/comment');

//Routes
const userRoutes = require('./api/routes/users');
const postRoutes = require('./api/routes/posts');

const mongoDBName = process.env.MONGO_DATABASE || 'test';

mongoose.connect('mongodb://admin:'+ process.env.MONGO_ATLAS_PW +'@droplet-shard-00-00-8shns.mongodb.net:27017,droplet-shard-00-01-8shns.mongodb.net:27017,droplet-shard-00-02-8shns.mongodb.net:27017/test?ssl=true&replicaSet=Droplet-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes to handle requests
app.use('/users', userRoutes);
<<<<<<< HEAD
app.use('/posts', postRoutes);
=======
app.use('/posts', postRoutes)
>>>>>>> 5d153475785f7c3e424859912e18e1f6f4c46cfd

//404 error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
