const mongoose = require('mongoose');
const validator = require('validator');

const shopSchema = new mongoose.Schema({
    sellerID:{
        type: String,
        required: [true, 'Shop has to belong to a seller'],
        select: false
    },
    name: {
        type: String,
        required:  [true, 'Shop must have a name'],
        trim: true,
        maxlength: [40, 'Shop name must have less or equal 40 characters'],
        minlength: [5, 'Shop name must have more or equal 5 characters'],
    },
    logo: String,
    rating: {
        type: Number,
        max: 5,
        min: 1,
        default: 3
    },
    phoneContact: {
        type: String,
        unique: true,
        validate: [validator.isNumeric, 'Please provide a valid phone number']

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    description: String,
    joinDate:{
        type: Date,
        default: Date.now(),
        select: false
    }

})
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;