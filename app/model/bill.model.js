const mongoose = require('mongoose');
const validator = require('validator');

const billSchema = new mongoose.Schema({
    shopID:{
        type: mongoose.Types.ObjectId,
        ref:'Shop'
    },
    listProduct:{
	type: [String]
	},
    time:{
        type: Date,
        default: Date.now(),
        select: false
    }

})
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;