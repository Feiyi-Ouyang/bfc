// start express server and mongodb
const express = require("express");
const mongoClient = require("mongodb").MongoClient;

const server = express();
server.listen(process.env.PORT, function() {
    console.log("app listening");
})

mongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) {
        console.log("Error: unable to connect to db");
    } else {
        console.log("db connected");
    }
})

exports.server = server;