// start express server and mongodb
const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const path = require('path');

const server = express();
// Serve static files from the React after it is built
server.use(express.static(path.join(__dirname, 'client/build')));
// Listen to PORT defined in .env
server.listen(process.env.PORT, function() {
    console.log("app listening");
})

// Connect to URI defined in .env
mongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
})

exports.server = server;