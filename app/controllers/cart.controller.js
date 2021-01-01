const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError")
exports.addToCart = catchAsync(async (req, res, next) => {
    try {
        if (req.session.cart) {
            if (!req.session.cart.includes(req.body.id))
                req.session.cart.push(req.body.id);
        }
        else {
            req.session.cart = [req.body.id];
        }
        res.redirect(req.headers.referer);
    } catch (error) {
        return next(new AppError("Không thêm vào túi được", 400));
    }
});