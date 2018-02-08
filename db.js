var mongoose = require('mongoose');


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

var cartSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    products: [{
        id: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    }]
}, {
    usePushEach: true
});

module.exports = {
    userSchema: userSchema,
    productSchema: productSchema,
    cartSchema: cartSchema
}