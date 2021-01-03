const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const Shop = require("../model/shop.model");
const Bill = require("../model/bill.model");
const { Mongoose } = require("mongoose");
var mongoose = require('mongoose');

exports.getHome = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  const category = await Product.find({}).distinct("category").populate("category").lean({ virtuals: true });
  res.status(200).render("home-page", {
    title: "Home",
    csspath: "home-page",
    category,
    layout: "default",
    user: user,
  });
});


exports.getOverview = catchAsync(async (req, res, next) => {
  var product = await Product.find().lean();
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  const category = await Product.find({}).distinct("category").populate("category").lean({ virtuals: true });
  res.status(200).render("category", {
    title: "Category",
    category,
    products: product,
    empty: product === null,
    csspath: "category-page",
    layout: "default",
    user: user,
  });
});

exports.ProByCat = catchAsync(async (req, res, next) => {
  const catName = req.param('cat');
  const product = await Product.find({ category: catName })
    .lean({ virtuals: true });
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  const category = await Product.find({}).distinct("category").populate("category").lean({ virtuals: true });
  res.status(200).render("category", {
    title: catName,
    category,
    products: product,
    user: user,
    empty: product === null,
    csspath: "category-page",
    layout: 'default',
  })
});

exports.getFitleredProduct = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  // Get các query sau dấu ?
  const queryString = req.url.substring(req.url.indexOf("?"));

  const response = await axios({
    method: "GET",
    url: "http://localhost:8000/api/product" + queryString,
  });
  const products = response.data.data.docs;
  if (response.data.status === "success") {
    res.status(200).render("category", {
      title: "Category",
      products: products,

      empty: products.length === 0,
      csspath: "category-page",
      layout: "default",
      user: user,

    });
  } else {
    res.render("error");
  }
});

exports.getProduct = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  const product = await Product.findOne({ slug: req.params.slug }).populate({path: "shopID" }).lean();

  const category = await Product.find({}).distinct("category").populate("category").lean({ virtuals: true });
  res.status(200).render("product-page", {
    title: "Sản phẩm",
    category,
    empty: product === null,
    product: product,
    // /activeImg: product.toArray().images,
    user: user,
    csspath: "product-page",
    jspath: "product-page",
    layout: "default",
  });
});

//CUSTOMER
exports.getCustomerInfo = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  const getCustomer = await User.findOne({ email: user.email }).lean({ virtuals: true });
  res.status(200).render("customer-page", {
    user: getCustomer,
    csspath: "customer-page",
    layout: 'customer',
  })
});

exports.getSigntobeshop = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  const getCustomer = await User.findOne({ email: user.email }).lean({ virtuals: true });


  res.status(200).render("signtobeshop", {
    user: getCustomer,
    csspath: "signtobeshop",
    layout: 'customer',
  })
});


//ADMIN
exports.getAccountAdmin = catchAsync(async (req, res, next) => {
  let user = res.locals.user;
  if (user) {
    if (!user.name) user.name = user.username;
    user = {
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
  const accounts = await User.find({"username": {$ne: user.username}}).lean();
  const shops = await Shop.find({}).lean();
  res.status(200).render("admin-page", {
    csspath: "admin-page",
    layout: 'admin',
    accounts,
    shops,
  })
});

exports.getStatisticsAdmin = catchAsync(async (req, res, next) => {
  const selledProducts = await Bill.find({}).populate({path:"listProduct.proID", populate: {
    path: 'shopID',
    model: 'Shop'
  } }).lean()
  var products = []
  selledProducts.forEach(e=>{
    products = products.concat(e.listProduct)
  })
  var result = [];
  products.reduce((total, value)=> {
    if (!total[value.proID.shopID._id]) {
      total[value.proID.shopID._id] = { shop: value.proID.shopID, qty: 0 };
      result.push(total[value.proID.shopID._id])
    }
    total[value.proID.shopID._id].qty += value.amount;
    return total;
  }, {});
  result.sort(function (a, b) {
    return b.qty - a.qty;
  });
  var shops = [];
  result.sort(function (a, b) {
    return b.qty - a.qty;
  });
  if (result.length <= 4)
    shops = result;
  else
    shops = result.slice(0, 4);

  //top customer
  var customers = await Bill.find({}).populate("customer").lean()
  customers.forEach((e)=>{
    e.count = e.listProduct.reduce((a, b) => a + b.amount, 0)
  });
  
  result = [];
  customers.reduce((total, value)=> {
    if (!total[value.customer._id]) {
      total[value.customer._id] = { customer: value.customer, qty: 0 };
      result.push(total[value.customer._id])
    }
    total[value.customer._id].qty += value.count;
    return total;
  }, {});
  result.sort(function (a, b) {
    return b.qty - a.qty;
  });
  if (result.length <= 4)
    customers = result;
  else
    customers = result.slice(0, 4);
  var prevMonth = function(dateObj) {
    var tempDateObj = new Date(dateObj);    
    if(tempDateObj.getMonth) {
      tempDateObj.setMonth(tempDateObj.getMonth() - 1);
    } else {
      tempDateObj.setYear(tempDateObj.getYear() - 1);
      tempDateObj.setMonth(12);
    }
    
    return tempDateObj
  };
  var toString = (dateObj)=>{
    var month = dateObj.getMonth();
    
    var year = dateObj.getFullYear();
    if (month === 0){
      month = 12;
      year--;
    }
    return "Tháng " + month + ", " + year;
  }
  var countUserShop = []
  var today = new Date();
  var preMonth1 = prevMonth(today)
  var preMonth2 = prevMonth(preMonth1)
  var preMonth3 = prevMonth(preMonth2)
  var preMonth4 = prevMonth(preMonth3)
  preMonth1.setDate(32)
  console.log(preMonth1)
  preMonth2.setDate(32)
  preMonth3.setDate(32)
  preMonth4.setDate(32)

  var countUser = await (await User.find({openDate:{$lte: preMonth1 } })).length
  var countShop = await (await Shop.find({joinDate:{$lte: preMonth1 } })).length
  countUserShop.push({time: toString(preMonth1),users:countUser, shops:countShop})

  countUser = await (await User.find({openDate:{$lte: preMonth2 } })).length
  countShop = await (await Shop.find({joinDate:{$lte: preMonth2 } })).length
  countUserShop.push({time: toString(preMonth2),users:countUser, shops:countShop})
 
  countUser = await (await User.find({openDate:{$lte: preMonth3 } })).length
  countShop = await (await Shop.find({joinDate:{$lte: preMonth3 } })).length
  countUserShop.push({time: toString(preMonth3),users:countUser, shops:countShop})
  
  countUser = await (await User.find({openDate:{$lte: preMonth4 } })).length
  countShop = await (await Shop.find({joinDate:{$lte: preMonth4 } })).length
  countUserShop.push({time: toString(preMonth4),users:countUser, shops:countShop})
  res.status(200).render("admin-statistics", {
    csspath: "admin-statistics",
    layout: 'admin',
    shops,
    customers,
    countUserShop,
  })
});
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const username = req.body.username;
  await User.deleteOne({ username: username });
  const url = req.session.retUrl || '/admin';
  res.redirect(url);
});
exports.deleteShop = catchAsync(async (req, res, next) => {
  const shopName = req.body.name;
  await Shop.deleteOne({ name: shopName });
  const url = req.session.retUrl || '/admin';
  res.redirect(url);
});

exports.getShopInfo = catchAsync(async (req, res, next) => {
  try {
    const userID = req.user.id;
    const shop = await Shop.findOne({ sellerID: userID }).select("+joinDate").lean();
    
    if (shop)
      res.render('shop-infor', {
        stylecss: 'shop-infor.css',
        title: 'Thông tin cửa hàng',
        shopName: shop.name,
        shopPhone: shop.phoneContact,
        shopAddress: 'TPHCM',
        shopEstDay: shop.joinDate,
        shopDescribe: shop.description,
        numProduct: '1500',
        numSaledProduct: '1200',
        overallRating: '4.5',
        billCanceledRate: '5%',
      });
      else{
        res.render("error",{
          message:"Không tìm thấy shop"        
        })
      }
  } catch (error) {
    console.log(error);
  }
 
})

exports.getProductList = catchAsync(async (req, res, next) => {
  try {
    const user = res.locals.user;
    const shop = await Shop.findOne({ sellerID: user.id });
    if (shop) {
      const products = await Product.find({ shopID: shop.id }).select("+createdAt").lean();
      res.status(200).render("product-list", {
        title: "Trang sản phẩm",
        productList: products,
        stylecss: 'product-list.css'

      }

      )
    }
  } catch (error) {
    console.log(error);
  }



})

exports.getCart = catchAsync(async (req, res, next) => {
  try {
    const cart = req.session.cart;
    let user = res.locals.user;

    if (user) user = { name: user.name, email: user.email, role: user.role };
    let totalPrice = 0;
    let isEmpty = true;
    let numProducts = 0;
    let products = [];
    if (cart) {
      for(let i = 0; i< cart.length; i++)
      {
        products.push(await Product.findOne({slug: cart[i]}).lean());
      }

      products.forEach(element => {
        totalPrice += element.price;
      });
      numProducts = products.length;
      if (numProducts != 0) isEmpty = false;

    }
    
    res.status(200).render("cart-page", {
      title: "Cart",
      user: user,
      empty: isEmpty,
      productsInCart: products,
      numProducts: numProducts,
      totalPrice: totalPrice,
      csspath: "cart-page"
    });
  } catch (error) {
    console.log(error);
  }

});