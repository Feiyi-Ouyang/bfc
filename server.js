const express = require('express');
const mongodb = require('mongodb');

const app = express();

// Listening on the Heroku port or localhost port
app.listen(process.env.PORT || 8080, function() {
    console.log("app listening");
});

// Use MongoClient interface to connect to a mongodb server
const mongoClient = mongodb.MongoClient;

// MONGODB_URI
const uri = process.env.MONGODB_URI;

mongoClient.connect(uri, function(err, db) {
    if (err) {
        console.log("Error: unable to connect to mongodb");
    } else {
        console.log("mongodb connected")
    }
});