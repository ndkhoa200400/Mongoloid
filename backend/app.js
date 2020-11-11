const express = require('express');
const morgan =  require("morgan");
const app = express();

if(process.env.NODE_ENV ==='development')
    app.use(morgan('dev'));


app.use(express.json());

app.all('*', (req, res, next)=>{
    // 404 Not Foudn Error;
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});



module.exports = app;