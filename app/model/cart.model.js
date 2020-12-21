const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema({

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
const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;