const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({
    idUser:{
        type: String,
        required: [true, 'Shop has to belong to a user']
    },
    name: {
        type: String,
        required:  [true, 'Shop must have a name'],
        trim: true,
        maxlength: [40, 'Shop name must have less or equal 40 characters'],
        minlength: [5, 'Shop name must have more or equal 5 characters'],
    },
    logo: String,
    rating: Number,
    description: String,
    joinDate:{
        type: Date,
        default: Date.now(),
        select: false
    }

})
const Shop = mongoose.model('Shop', shopSchema);




module.exports = Shop;