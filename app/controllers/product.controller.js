const Product = require('./../model/product.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')
const Shop = require('./../model/shop.model');

exports.setShop = catchAsync(async (req, res, next) => {
    const sellerID = req.user.id;
    console.log(sellerID);
    const shop = await Shop.findOne({ sellerID: sellerID });

    if (!shop) {

        return next(new AppError("You have not opened a shop yet!", 400))

    }
    req.body.shopID = shop._id;
    next(); // pass to getUser function
});

exports.getAllProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product, {
    path: 'shopID',
});

exports.createProduct = catchAsync(async (req, res, next) => {
    try {
        if (req.body) {
            req.body.amount = +req.body.amount;
            req.body.price = +req.body.price;
            req.body.images = [req.body.image];
            const shop = await Product.create(req.body);
            res.send(`
                <script>
                    alert("Đăng sản phẩm thành công");
                    window.location.replace("/product-list")
                </script>
            `)

        }

    } catch (error) {
        console.log(error.message);
        res.send(`
            <script>
                alert("${error.message}");
                window.location.replace("/add-product")
            </script>
            
    `)


    }



    //await Shop.create('')
})

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.search = catchAsync(async (req, res, next) => {
    const query = req.query.name; // /product/search?name='';

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