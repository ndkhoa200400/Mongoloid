const Product = require('./../model/product.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')
const Shop = require('./../model/shop.model');

exports.getShop = catchAsync(async(req,res,next) => {
    const sellerID = req.user.id;
    const shop = await Shop.find({sellerID: sellerID});

    req.body.shopID = shop[0]._id;
    console.log(shop[0]._id);
    console.log(req.body);
    next(); // pass to getUser function
});

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);
