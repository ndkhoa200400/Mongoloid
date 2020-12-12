const User = require('./../model/user.model');
const jwt = require("jsonwebtoken");
const catchAsync = require('./../utils/catchAsync')
const appError = require('./../utils/appError');
const { promisify } = require('util');
const crypto = require('crypto');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user._id);
    const cookieOptions = {
        // options for cookie
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly: true // prevent XSS atack
    }

    // Khi ở production mới set sercure = true để HTTPS protect cookie
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    
    
    res.cookie('jwt', token, cookieOptions)

    // Remove the password from the output
    user.password = undefined;
    
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res)
    
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password, username } = req.body;
    // 1) Check if email or username and password exist
    if ((!email && !username )|| !password) {
        return next(new appError('Please provide email or username and password!', 400));
    }

    // 2) Check if user exists && password is correct
    let user;
    if (email)
    {
        user = await User.findOne({ email: email }).select('+password');
    }
    else 
    {
        user = await User.findOne({ username: username }).select('+password');
    }

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new appError('Incorrect email or username or password', 401));
    }
    // 3) IF everything is ok, send token to client
    createSendToken(user, 200, res)
    
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check 
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

    }else if (req.cookies.jwt)
    {
        // Get cookie from local storage of browser 
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError('You are not logged in! Please log in to get access', 401));
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists 
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) return next(new appError('The user belonging to this token does not exist'))

    // 4) Check if user changed password after the token was issued
    if (freshUser.changePasswordAfter(decoded.iat)) {
        return next(new appError('User recently changed password! Please log in again.', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTES
    req.user = freshUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'seller']
        if (!roles.includes(req.user.role)) {
            return next(new appError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new appError('There is no user with that mail', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.forgotPassword();
    await user.save({ validateBeforeSave: false });
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a patch request with your new password and password confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 mins)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new appError('There was an error sending the email. Try again later', 500));
    }

});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken, 
        passwordResetExpires: { $gt: Date.now() } 
    });

    if (!user)
    {
        return next(new appError('Token is invalid or has expired', 400));
    }
    // 2) If token has not expired, and there is user, set the new pw
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // 3) update changePasswordAt for thr user
   
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res)
    
})

exports.updatePassword = catchAsync(async(req, res, next) =>{
    // 1) Get user from collection
    const user =  await User.findById(req.user.id).select("+password");

    // 2) Check if POSTed current password is correct
    if (!user.correctPassword(req.body.passwordCurrent, user.password)){
        return next(new appError('Your current password is wrong', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // findByIDAndUpdate will not work

    // 4) Log user in, send JWT
    createSendToken(user, 200, res)
    
})