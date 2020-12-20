const express = require('express');
const controller = require('../controllers/view.controller');
const authController = require('../controllers/auth.controller')

var hbs = require('hbs');

const router = express.Router();

hbs.registerPartials(__dirname + '../views/partials');

router.use(authController.isLoggedIn);

router.get('/', controller.getOverview)
router.get('/category', controller.ProByCat)

router.get('/login', (req, res) => {
    res.render('login_page', {
        title: 'Xin chào',
        csspath: 'login_page',

    })
});

router.get('/product/search/', controller.getFitleredProduct);

router.get('/product/:slug', controller.getProduct);

//test shop channel
//view shop information
router.get('/shop-infor', (req, res) => {
    res.render('shop-infor', {
        stylecss: 'shop-infor.css',
        title: 'Thông tin cửa hàng',
        shopName: 'Shop đồ nam Thuận Mỹ',
        shopPhone: '01212121212',
        shopAddress: 'TPHCM',
        shopEstDay: '10/10/1111',
        shopDescribe: 'Shop chuyên sỉ lẻ đồ nam trên toàn quốc',
        numProduct: '1500',
        numSaledProduct: '1200',
        overallRating: '4.5',
        billCanceledRate: '5%',
    });
});
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
router.get('/product-list', (req, res) => {
    res.render('product-list', {
        stylecss: 'product-list.css',
    });
});
//add product
router.get('/product-list/add-product', (req, res) => {
    res.render('add-product', {
        stylecss: '../public/add-product.css',
    });
});
//view shop sales
router.get('/sales', (req, res) => {
    res.render('sales', {
        stylecss: 'sales.css',
    });
});
module.exports = router;