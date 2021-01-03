const express = require('express');
const controller = require('../controllers/view.controller');
const authController = require('../controllers/auth.controller')

var hbs = require('hbs');

const router = express.Router();

hbs.registerPartials(__dirname + '../views/partials');

router.use(authController.isLoggedIn);

router.get('/', controller.getHome);
router.get('/category', controller.getOverview);
//router.post('/category', controller.ProByCatAndFilter);
router.get('/cart',controller.getCart)

router.get('/category/:cat', controller.ProByCat);

router.get('/become-seller', (req, res) => {
    res.render('signtobeshop')
})

router.get('/login', (req, res) => {
    res.render('login_page', {
        title: 'Xin chào',
        csspath: 'login_page',

    })
});

router.get('/product/search/', controller.getFitleredProduct);

router.get('/product/:slug', controller.getProduct);

//customer channel
//view customer info
router.get('/customer/:mail', controller.getCustomerInfo);

//admin channel
//view account info
router.get('/admin', controller.getAccountAdmin);
//view statistics
router.get('/admin/statistics', controller.getStatisticsAdmin);
router.post('/admin/deleteAccount', controller.deleteAccount);
router.post('/admin/deleteShop', controller.deleteShop);

//test shop channel
//view shop information
router.get('/shop-infor', authController.protect, authController.restrictTo('seller'), controller.getShopInfo);
//view shop bills
router.get('/bill-infor', (req, res) => {
    res.render('bill-infor', {
        stylecss: 'bill-infor.css',
    });
});
//view shop canceled bills
router.get('/bill-cancel-infor', (req, res) => {
    res.render('bill-cancel-infor', {
        stylecss: 'bill-cancel-infor.css',
    });
});
//view shop all products
router.get('/product-list', authController.protect, authController.restrictTo('seller'), controller.getProductList);
//add product
router.get('/add-product', authController.protect, authController.restrictTo('seller'), (req, res) => {
    res.render('add-product', {
        stylecss: 'add-product.css',
    });
});
//view shop sales
router.get('/sales', (req, res) => {
    res.render('sales', {
        stylecss: 'sales.css',
    });
});
module.exports = router;