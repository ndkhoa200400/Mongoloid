const express = require('express');
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const exphbs = require('express-handlebars');
const numeral = require('numeral');
const path = require('path');
const globalErrorHandler = require("./controllers/error.controller");
const app = express();
const hbsHelpers = require('handlebars-helpers')();
const hbs_sections = require('express-handlebars-sections');
app.use(express.static(path.join(__dirname, "./", "/public")));
app.use('/public', express.static('public'))
//this required before view engine setup

app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'default',
    helpers: {
      section: hbs_sections(),
      format_number(val) {
        return numeral(val).format('0,0');
      },
      hbsHelpers
    }
  })
);
app.set('view engine', 'hbs');
app.use(express.urlencoded({
  extended: true
}));

// Routing
const viewRoute = require('./routes/view.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const shopRoute = require('./routes/shop.route');


if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));


app.use(express.json());
app.use(cookieParser());

// const limiter = rateLimit({
//   // Alow 100 requests from the same IP in 1 hour
//   max: 100,
//   window: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/", limiter);

app.use('/', viewRoute);
app.use('/api/shop', shopRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute)
// app.all('*', (req, res, next)=>{
//     // 404 Not Found Error;
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
// });

app.get("*", function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// error handling
app.use(globalErrorHandler);
module.exports = app;