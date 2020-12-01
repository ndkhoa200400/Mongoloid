const express = require('express');
const morgan =  require("morgan");
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError')
const rateLimit = require("express-rate-limit");

const app = express();


// Routing
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const shopRoute = require('./routes/shop.route');


if(process.env.NODE_ENV ==='development')
    app.use(morgan('dev'));


app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
    // Alow 100 requests from the same IP in 1 hour
    max: 100,
    window: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  });
app.use("/api", limiter);


app.use('/api/shop', shopRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute)
app.all('*', (req, res, next)=>{
    // 404 Not Found Error;
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});



module.exports = app;