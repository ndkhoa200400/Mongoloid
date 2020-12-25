const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");
const productController = require("./product.controller");
const axios = require("axios");
const url = require("url");
const Shop = require("../model/shop.model");


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
    title: "Mongoloid - Home",
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

  const product = await Product.findOne(
    { slug: req.params.slug }
  ).populate({
    path: "shopID"
  })
    .lean();

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
  console.log(getCustomer);

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

  res.status(200).render("admin-page", {
    csspath: "admin-page",
    layout: 'admin',
  })
});

exports.getStatisticsAdmin = catchAsync(async (req, res, next) => {
  res.status(200).render("admin-statistics", {
    csspath: "admin-statistics",
    layout: 'admin',
  })
});

exports.getShopInfo = catchAsync(async (req, res, next) => {
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