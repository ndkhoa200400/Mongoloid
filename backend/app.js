const express = require('express');
const morgan =  require("morgan");
const AppError = require('./utils/appError')
const app = express();

// Routing
const productRoute = require('./routes/product.route');

if(process.env.NODE_ENV ==='development')
    app.use(morgan('dev'));


app.use(express.json());


app.use('/api/product', productRoute)
app.all('*', (req, res, next)=>{
    // 404 Not Found Error;
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});



module.exports = app;