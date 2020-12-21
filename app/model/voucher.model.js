const mongoose = require('mongoose');
const validator = require('validator');

const voucherSchema = new mongoose.Schema({
    code:{
        type: String,
        required: [true, 'voucher mush have code'],
        select: false
    },
    discount:Number,
    openDate:{
        type: Date,
        default: Date.now(),
        select: false
    },
    closeDate:{
        type: Date,
        default: Date.now(),
        select: false
    },
    shopID:{
        type: mongoose.Types.ObjectId,
        ref:'Shop'
    }

})
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;