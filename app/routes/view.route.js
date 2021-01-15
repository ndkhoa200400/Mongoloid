const express = require('express');
const controller = require('../controllers/view.controller');
const authController = require('../controllers/auth.controller')
const Shop = require("../model/shop.model");
const Bill = require("../model/bill.model");
const Product = require("../model/product.model");
var hbs = require('hbs');

const router = express.Router();

hbs.registerPartials(__dirname + '../views/partials');

router.use(authController.isLoggedIn);

router.get('/', controller.getHome);
router.get('/category', controller.getOverview);
//router.post('/category', controller.ProByCatAndFilter);
router.get('/cart', controller.getCart)

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
router.get('/customer/:mail', authController.protect,controller.getCustomerInfo);

//admin channel
//view account info
router.get('/admin',  authController.protect, authController.restrictTo('admin'),controller.getAccountAdmin);
//view statistics
router.get('/admin/statistics',  authController.protect, authController.restrictTo('admin'),controller.getStatisticsAdmin);
//view products
router.get('/admin/products',  authController.protect, authController.restrictTo('admin'),controller.getAdminProducts);

router.post('/admin/deleteAccount', controller.deleteAccount);
router.post('/admin/deleteShop', controller.deleteShop);
router.post('/admin/deleteProduct', controller.deleteProductAdmin);


//test shop channel
//view shop information
router.get('/shop-infor', authController.protect, authController.restrictTo('seller'), controller.getShopInfo);
//view shop bills
router.get('/bill-infor', authController.protect, authController.restrictTo('seller'), controller.getBillList);
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
router.get('/sales',  authController.protect, authController.restrictTo('seller'),async (req, res) => {
    const userID = req.user.id;
    const shop = await Shop.findOne({ sellerID: userID }).select("+joinDate").lean();
    var days; // Days you want to subtract
    function lastDate(date, days){
        var d = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        d.setHours(0, 0, 0);
        return d;
    }
    function lastDateEnd(date, days){
        var d = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        d.setHours(23, 59, 59);
        return d;
    }
    var now = new Date()
    var last7days = []
    for(var k = 0; k < 7; k++){
        var curentDate = lastDate(now, k);
        
        
        const selledProducts = await Bill.find({}).populate({
            path: "listProduct.product", populate: {
              path: 'shopID',
              model: 'Shop'
            }, model: 'Product'
          }).where('time').lte(lastDateEnd(now, k)).lean();
          
          var products = []
          for(var i = 0; i < selledProducts.length; i++) {
            products = products.concat(selledProducts[i].listProduct)
          }
          var money = 0;
          for(var i = 0; i < products.length; i++){
             if(products[i].product.shopID._id.equals(shop._id))
                money += products[i].product.price * products[i].amount;
                
          }
          
          last7days.push({id: k ,x: curentDate,y: money})
    }
       
    
      console.log(last7days)
    res.render('sales', {
        stylecss: 'sales.css',
        last7days
    });
});
router.get('/shop/delete-product', controller.deleteProduct)


module.exports = router;