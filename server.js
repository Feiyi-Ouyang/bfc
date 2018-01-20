var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to db bfc on port 27017 
mongoose.connect('mongodb://localhost:27017/bfc', {
    useMongoClient: true,
});
mongoose.Promise = global.Promise;
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
// "users" collection
var userModel = mongoose.model('user', userSchema);

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post("/register", function callback(req, res){
    var userInfo = req.body;
    var newUser = new userModel(userInfo);
    var error = newUser.validateSync();
    if (error) {
        return res.status(400).send({message: error.message})
    }
    userModel.find({username: userInfo.username}, function (error, docs){
        if (error) {
            return res.status(400).send({message: error.message})
        }
        if (docs.length) {
            return res.status(400).send({message: "Username already exists"});
        } else {
            userModel.find({email: userInfo.email}, function (error, docs){
                if (error) {
                    return res.status(400).send({message: error.message})
                }
                if (docs.length) {
                    return res.status(400).send({message: "Email already exists"});
                } else {
                    if (userInfo.password1 != userInfo.password2) {
                        return res.status(400).send({message: "Passwords not the same"})
                    } else {
                        newUser.save(function(error){
                            if (error) {
                                return res.status(400).send({message: error.message})
                            } else {
                                return res.send({message: "New user wrote to db"});
                            }
                        });
                    }
               }
            })
        }
    })
});
app.post("/login", function callback(req, res){
    var userInfo = req.body;
    userModel.findOne({email: userInfo.email}, function (error, doc){
        if (error) {
            return res.status(400).send({message: error.message})
        }
        if (doc == null || doc.length == 0) {
            return res.status(400).send({message: "User not exist"});
        }
        if (doc.password1 != userInfo.password) {
            return res.status(400).send({message: "Wrong password"});
        } else {
            return res.send({message: "Logged in", user: doc});
        }
    })
})
app.get("/profile/:userId", function (req, res){
    console.log(req.body)
    var userId = req.params.userId
    userModel.findOne({_id: userId}, function (error, user){
        if (error) {
            return res.status(400).send({message: error.message})
        }
        return res.send({user: user})
    })
})
app.listen(3000);