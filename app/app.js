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
const session = require('express-session');
const moment = require('moment');


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
      format_date(val) {
        return moment(val).format('L');
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
const cartRoute = require('./routes/cart.route');

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));


app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'SECRET_KEY',
  resave: false,
  saveUninitialized: true,
  maxAge: Date.now() + (60 * 60 * 1000)
}));
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});
// const limiter = rateLimit({
//   // Alow 100 requests from the same IP in 1 hour
//   max: 100,
//   window: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/", limiter);

app.use('/', viewRoute);
app.use('/cart', cartRoute);
app.use('/user', userRoute);
app.use('/api/shop', shopRoute);

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