const Bill = require('./../model/bill.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')


exports.getAllBills = factory.getAll(Bill);

exports.getBill = factory.getOne(Bill);

exports.createBill = factory.createOne(Bill);

exports.updateBill = factory.updateOne(Bill);

exports.deleteBill = factory.deleteOne(Bill);
