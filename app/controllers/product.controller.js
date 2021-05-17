const Product = require('./../model/product.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');
const factory = require('./handlerFactory')
const Shop = require('./../model/shop.model');

exports.ratingProduct = async (req, res, next) => {
    console.log(req.params);
    const product = await Product.findById(req.params.id);
    const user = res.locals.user;
    console.log(product);
    console.log(user);
    for (let i = 0; i < product.rating.length; i++) {
        if (product.rating[i].user.equals(user._id)) {
            product.rating[i].stars = +req.body.rating;
            await product.update({ rating: product.rating });
            return res.redirect(`/product/${product.slug}`);
        }
    }

    product.rating.push({ stars: +req.body.rating, user: user._id })
    await product.update({ rating: product.rating });
    res.redirect(`/product/${product.slug}`);
}
exports.setShop = catchAsync(async (req, res, next) => {
    const sellerID = req.user.id;
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
            await Product.create(req.body);
            res.send(`
                <script>
                    alert("Đăng sản phẩm thành công");
                    window.location.replace("/product-list")
                </script>
            `)

        }

    } catch (error) {
        const errors = Object.values(error.errors).map((el) => el.message);
        const mess = `Lỗi nhập liệu: ${errors.join(", ")}`;
        res.send(`
            <script>
                alert('${mess}');
                window.location.replace("/add-product")
            </script>
            
    `)


    }

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