const Product = require('./../model/product.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
exports.getAllProducts = catchAsync(async (req, res) => {
    // EXECUTE QUERY      
    const features = new APIFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const products = await features.query;

    res.status('200').json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    })

});

exports.getProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    
    if (!product)
    {
        next(new AppError('No product found with ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })

});


exports.createProduct = catchAsync(async (req, res, next)=>{
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });
})

exports.updateProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!product)
    {
        next(new AppError('No product found with ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
           product
        }
    })

});

exports.deleteProduct = catchAsync(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
    {
        next(new AppError('No product found with ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
});