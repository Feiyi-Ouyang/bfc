// start express server and mongodb
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const server = express();
// Serve static files from the React after it is built
server.use(express.static(path.join(__dirname, 'client/build')));
// Listen to PORT defined in .env
server.listen(process.env.PORT, function () {
    console.log("app listening");
})
// To parse request
server.use(bodyParser.json());

// Connect mongoose to a mongodb database
mongoose.connect(process.env.MONGOLAB_PUCE_URI, function (err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
})
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Define schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password_v: {
        type: String,
        required: true
    },
});
// Compile model from schema
var userModel = mongoose.model('user', userSchema);

// Contract: only send {message: <errMsg>} once
server.post("/register", function (req, res) {
    console.log("server receive POST request from /register");

    var userInfo = req.body;
    console.log("userInfo ", userInfo);

    // Create an instance of model SomeModel
    var user_instance = new userModel(userInfo);

    // Validate data conforms with Schema
    var err = user_instance.validateSync();
    if (err) {
        res.status(400).send({message: err.message})
    }

    // Validate replicated userInfo, query with email
    userModel.find({username: userInfo.username}, function (err, result){
        if (err) {
            res.status(400).send({message: err.message})
        } else {
            if (result.length) {
                res.status(400).send({message: "username already exists"});
            } else {

                // Save the new model instance 
                user_instance.save(function (err) {
                    if (err) {
                        res.status(400).send({message: err.message})
                    } else {
                        res.send({message: "userInfo saved in db"});
                    }
                });
            }
        }
    })

})