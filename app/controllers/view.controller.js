const User = require("../model/user.model");
const catchAsync = require("../utils/catchAsync");
const axios = require("axios");
const Shop = require("../model/shop.model");
const Bill = require("../model/bill.model");
const Product = require("../model/product.model");
const pagination = require('./../utils/pagination');

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
  let page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await Product.count()
  .lean({ virtuals: true });

  const page_numbers = pagination.calcPageNumbers(total, page);
  const offset = pagination.calcOffset(page);
  const next_page = pagination.calcNextPage(page, page_numbers);
  const prev_page = pagination.calcPreviousPage(page, page_numbers);

  const product = await Product.find().limit(pagination.limit).skip(offset)
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
    title: "Category",
    category,
    products: product,
    empty: product === null,
    csspath: "category-page",
    layout: "default",
    user: user,
    page_numbers,
    next_page,
    prev_page
  });
});

exports.ProByCat = catchAsync(async (req, res, next) => {
  const catName = req.param('cat');
  let page = req.query.page || 1;
  if (page < 1) page = 1;
  const total = await Product.count({ category: catName })
  .lean({ virtuals: true });

  const page_numbers = pagination.calcPageNumbers(total, page);
  const offset = pagination.calcOffset(page);
  const next_page = pagination.calcNextPage(page, page_numbers);
  const prev_page = pagination.calcPreviousPage(page, page_numbers);
  
  const product = await Product.find({ category: catName }).limit(pagination.limit).skip(offset)
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
    page_numbers,
    next_page,
    prev_page
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
  var arrProduct = [];
  const getCustomer = await User.findOne({ email: user.email }).lean({ virtuals: true });
  const getCustomerBill = await Bill.find({customer: getCustomer._id}).lean();
  for (let i = 0; i < getCustomerBill.length; i++) {
    for (let j = 0; j < getCustomerBill[i].listProduct.length; j++) {
      var product = await Product.findOne({_id: getCustomerBill[i].listProduct[j].proID});
      const temp = {name: product.name, amount: getCustomerBill[i].listProduct[j].amount, sumprice: product.price*getCustomerBill[i].listProduct[j].amount, buydate: getCustomerBill[i].time};
      arrProduct.push(temp);
    }
  }
  res.status(200).render("customer-page", {
    user: getCustomer,
    csspath: "customer-page",
    layout: 'customer',
    arrProduct,
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
        products[i].images = products[i].images[0];
      }
      console.log(products);
      products.forEach(element => {
        totalPrice += element.price;
      });
      numProducts = products.length;
      if (numProducts != 0) isEmpty = false;

    }
    const category = await Product.find({}).distinct("category").populate("category").lean({ virtuals: true });
    res.status(200).render("cart-page", {
      title: "Cart",
      category,
      user: user,
      empty: isEmpty,
      productsInCart: products,
      numProducts: numProducts,
      totalPrice: totalPrice,
      csspath: "cart-page",
    });
  } catch (error) {
    console.log(error);
  }

});