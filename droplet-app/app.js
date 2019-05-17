const express = require('express');
const app = express();
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//Models
//require('./models/post');
//require('./models/comment');

//Routes
const userRoutes = require('./api/routes/users');
const postRoutes = require('./api/routes/posts');

const mongoDBName = process.env.MONGO_DATABASE || 'test';

mongoose.connect('mongodb+srv://admin:'+ process.env.MONGO_ATLAS_PW +'@dropletdemo-r8dtp.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
})

//CORS error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes to handle requests
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

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
