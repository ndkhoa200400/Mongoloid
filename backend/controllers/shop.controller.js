const Shop = require('./../model/shop.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')

exports.getAllShops = factory.getAll(Shop);

exports.getShop = factory.getOne(Product);

exports.createShop = factory.createOne(Product);

exports.updateShop = factory.updateOne(Product);

exports.deleteShop = factory.deleteOne(Product);
