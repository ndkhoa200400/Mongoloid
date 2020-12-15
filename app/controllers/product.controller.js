const Product = require('./../model/product.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')
const Shop = require('./../model/shop.model');

exports.setShop = catchAsync(async(req,res,next) => {
    const sellerID = req.user.id;
    const shop = await Shop.findOne({sellerID: sellerID});
    if (shop)
    {
        next(new AppError("You have not opened a shop yet!", 400))
        return;
    }
    req.body.shopID = shop._id;
    next(); // pass to getUser function
});

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product, {
    path: 'shopID',
});

exports.createProduct = factory.createOne(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.search = catchAsync(async (req, res, next)=>{
    const query = req.query.q; // /product/search?q='';

    const matchedProducts = await Product.find({
        name: {
            // ignore sensitive case
            $regex: query, $options: 'i'
        }
    });
    
    res.status(200).json({
        status: "success",
        results: matchedProducts.length,
        data: matchedProducts
    });
})