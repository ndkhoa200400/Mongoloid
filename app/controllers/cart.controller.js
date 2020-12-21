const Cart = require('./../model/cart.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')


exports.getAllBills = factory.getAll(Cart);

exports.getBill = factory.getOne(Cart);

exports.createBill = factory.createOne(Cart);

exports.updateBill = factory.updateOne(Cart);

exports.deleteBill = factory.deleteOne(Cart);
