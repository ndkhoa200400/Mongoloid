const mongoose = require('mongoose');
const validator = require('validator');

const billSchema = new mongoose.Schema({

    listProduct:{
	    type: [{product: {type: mongoose.Types.ObjectId,
            ref:'Product'}, amout: Number}],
        
	},
    time:{
        type: Date,
        default: Date.now(),
        select: false
    },
    customer:{
        type: mongoose.Types.ObjectId,
        ref:'User' 
    }

})
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;