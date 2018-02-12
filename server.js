// start express server and mongodb
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var multer = require('multer');
var upload = multer({ dest: 'client/public/productImg/' })

const server = express();
// Serve static files from the React after it is built
server.use(express.static(path.join(__dirname, 'client/build')));
// Listen to PORT defined in .env
server.listen(process.env.PORT, function (err) {
    if (err) {
        console.log("err: app listen");
    }
    console.log("app listening");
})
// To parse request
server.use(bodyParser.json());

// Connect mongoose to a mongodb database
mongoose.connect(process.env.MONGOLAB_URI, function (err, db) {
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
        return res.status(400).send({ message: err.message })
    }

    // Validate replicated userInfo, query with email
    userModel.find({ username: userInfo.username }, function (err, result) {
        if (err) {
            res.status(400).send({ message: err.message })
        } else {
            if (result.length) {
                res.status(400).send({ message: "username already exists" });
            } else {

                // Save the new model instance 
                user_instance.save(function (err) {
                    if (err) {
                        res.status(400).send({ message: err.message })
                    } else {
                        res.send({ message: "userInfo saved in db" });
                    }
                });
            }
        }
    })
})

server.post("/login", function (req, res) {
    console.log("server receive POST request from /login");

    var userInfo = req.body;
    console.log("userInfo ", userInfo);

    userModel.findOne({email: userInfo.email}, function (err, doc){
        if (err) {
            return res.status(400).send({message: error.message})
        }
        if (doc == null || doc.length == 0) {
            return res.status(400).send({message: "User not exist"});
        }
        if (doc.password != userInfo.password) {
            return res.status(400).send({message: "Wrong password"});
        } else {
            return res.send({message: "Logged in", user: doc});
        }
    })
})

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
});
var productModel = mongoose.model('product', productSchema);

server.post("/admin", upload.single('file'), function callback(req, res){
    console.log("server receive POST request from /admin");
    var productInfo = {name: req.body.name, price: req.body.price, img: req.file.filename};
    var newProduct = new productModel(productInfo);
    var error = newProduct.validateSync();
    if (error) {
        return res.status(400).send({message: error.message})
    }
    productModel.find({name: productInfo.name}, function (error, docs){
        if (error) {
            return res.status(400).send({message: error.message})
        }
        if (docs.length) {
            return res.status(400).send({message: "Product already exists"});
        } else {
            newProduct.save(function(error){
                if (error) {
                    return res.status(400).send({message: error.message})
                } else {
                    return res.send({message: "New product wrote to db"});
                }
            })
        }
    })
});

server.get("/home", function (req, res){
    productModel.find({}, function (error, products){
        if (error) {
            return res.status(400).send({message: error.message})
        }
        return res.send({products: products})
    })
})

