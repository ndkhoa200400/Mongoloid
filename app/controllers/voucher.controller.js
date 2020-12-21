const Voucher = require('./../model/Voucher.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')


exports.getAllVouchers = factory.getAll(Voucher);

exports.getVoucher = factory.getOne(Voucher);

exports.createVoucher = factory.createOne(Voucher);

exports.updateVoucher = factory.updateOne(Voucher);

exports.deleteVoucher = factory.deleteOne(Voucher);
