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
    password1: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    },
});
// Compile model from schema
var userModel = mongoose.model('user', userSchema);
server.post("/login", function (req, res) {
    console.log("server receive GET request from /login");
    var userInfo = req.body;
    console.log("userInfo ", userInfo);
    // Create an instance of model SomeModel
    // var awesome_instance = new userModel(userInfo);
    var awesome_instance = new userModel({username: 'a', email: 'a@a', password1: 'a', password2: 'b'});
    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {
        if (err) return handleError(err);
        console.log("saved!");
    });
   res.send({
        message: "getting back from server",
    });
    console.log("sent message to client")
})