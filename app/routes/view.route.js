const express = require('express');
const controller = require('../controllers/view.controller');
const authController = require('../controllers/auth.controller')

var hbs = require('hbs');

const router = express.Router();

hbs.registerPartials(__dirname + '../views/partials');

router.use(authController.isLoggedIn);

router.get('/', controller.getOverview)

router.get('/login', (req, res) => {
    res.render('login_page', {
        title: 'Xin chào',
        csspath: 'login_page',
      
    })
});

router.get('/product/search/', controller.getProduct);


//test shop channel
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
    })
})
module.exports = router;