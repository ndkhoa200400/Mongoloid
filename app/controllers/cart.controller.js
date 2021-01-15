const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
const Product = require('./../model/product.model')
const Bill = require('./../model/bill.model')
exports.addToCart = catchAsync(async (req, res, next) => {
    try {
       
        if (req.session.cart) {
            let isExisted = false;
            for (const item of req.session.cart) {
                if (item.slug === req.body.slug)
                {
                    isExisted = true;
                    break;
                }
            }
            if (!isExisted)
                req.session.cart.push(req.body);
        }
        else {
            req.session.cart = [req.body];
        }
        res.redirect(req.headers.referer);
    } catch (error) {
        return next(new AppError("Không thêm vào túi được", 400));
    }
});

exports.buynowCart = catchAsync(async (req, res, next) => {
    try {
        if (req.session.cart) {
            let isExisted = false;
            for (const item of req.session.cart) {
                if (item.slug === req.body.slug)
                {
                    isExisted = true;
                    break;
                }
            }
            if (!isExisted)
                req.session.cart.push(req.body);
        }
        else {
            req.session.cart = [req.body];
        }
        res.redirect('/cart');
    } catch (error) {
    
        return next(new AppError("Không thêm vào túi được", 400));
    }
});

exports.deleteItem = catchAsync(async (req, res, next) => {

    try {
       
        req.session.cart = req.session.cart.filter(item => item.slug !== req.params.slug);
       
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
})

exports.checkout = async (req, res, next) =>{
    try {
        cart = req.session.cart;
        const user = res.locals.user;
        let bill = [];
        if (cart)
        {
            let totalPrice = 0;
            for (const item of cart) {
                let product = await Product.findOne({slug: item.slug});
                if (product.amount < +item.amount)
                    throw new Error(`Số lượng sản phẩm '${product.name}' không đủ để thanh toán! Còn lại: ${product.amount}`);
                else{
                    totalPrice += +item.amount * product.price;
                }
                await product.updateOne({amount: (product.amount-+item.amount)});
                bill.push({product: product, amount: +item.amount});
            }

            await Bill.create({listProduct:bill, customer: user.id, total: totalPrice});
        }
        req.session.cart = [];
        res.send(`
            <script>
                alert("Thanh toán thành công");
                window.location = "/cart";
            </script>   
        `)
    } catch (error) {
        console.log(error.message);
        res.send(`
            <script>
                alert("${error.message}");
                window.location = "/cart";
            </script>
        `)
    }
}

exports.changeAmount = async (req, res) =>{
    try {     
        for(let i =0; i < req.session.cart.length; i++)
        {
            if (req.session.cart[i].slug===req.params.slug)
            {
                req.session.cart[i].amount = req.body.amount;
                break;
            }
        }

        res.redirect('/cart');
    } catch (error) {
        console.log(error.message);
        res.redirect('/cart');
    }
}