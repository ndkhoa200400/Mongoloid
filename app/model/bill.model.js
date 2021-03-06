const mongoose = require('mongoose');
const validator = require('validator');

const billSchema = new mongoose.Schema({

    listProduct: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }, amount: Number
    }],
    time: {
        type: Date,
        default: Date.now,
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number
    }

})
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;