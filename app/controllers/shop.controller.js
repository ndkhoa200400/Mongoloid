const Shop = require('./../model/shop.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')

exports.setSeller = (req, res, next) => {
    req.body.sellerID = req.user.id;
    next();
}

exports.getAllShops = factory.getAll(Shop);

exports.getShop = factory.getOne(Shop);

exports.createShop = factory.createOne(Shop);

exports.updateShop = factory.updateOne(Shop);

exports.deleteShop = factory.deleteOne(Shop);

exports.editShop = catchAsync(async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log(id);
        let shop = await Shop.findByIdAndUpdate(id, { name: req.body.name, phoneContact: req.body.phone, description: req.body.describe, joinDate: req.body.day, address: req.body.address });
        await shop.save();
        res.redirect('/shop-infor');
    }
    catch (error) {
        console.log(error);
    }
});


