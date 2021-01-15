const mongoose = require('mongoose');
const validator = require('validator');

const shopSchema = new mongoose.Schema({
    sellerID: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Thông tin người dùng không hợp lệ'],
        unique: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Shop phải có tên!'],
        trim: true
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
        validate: [validator.isNumeric, 'Số điện thoại không hợp lệ']

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email không hợp lệ']
    },
    description: String,
    joinDate: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    address: String,
})
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;