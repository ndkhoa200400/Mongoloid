const Shop = require('./../model/shop.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')

exports.setSeller = (req, res, next) =>{
    req.body.sellerID = req.user.id;
    next(); 
}

exports.getAllShops = factory.getAll(Shop);

exports.getShop = factory.getOne(Shop);

exports.createShop = factory.createOne(Shop);

exports.updateShop = factory.updateOne(Shop);

exports.deleteShop = factory.deleteOne(Shop);
