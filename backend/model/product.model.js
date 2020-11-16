const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, 'A product must have a name'],
        trim: true,
        maxlength: [40, 'A product name must have less or equal 40 characters'],
        minlength: [5, 'A product name must have more or equal 5 characters'],
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    images: [String],
    description: String,
    amount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    seller:{
        type: String,
        required: [true, 'A product has to belong to a seller']
    },
    category:{
        type: String,
        required: [true, 'Please provide category of product'],
        enum: ['hat', 'shirt', 'pants', 'backpack', 'none'],
        default: 'none'
    },
    createdAt:
    {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const Product = mongoose.model('Product', productSchema);




module.exports = Product;