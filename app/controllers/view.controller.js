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

  const product = await Product.findOne({ slug: req.params.slug }).populate({ path: "shopID" }).lean();

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
  try {
    let user = res.locals.user;

    let arrProduct = [];
    const getCustomerBill = await Bill.find({ customer: user.id });
    console.log(getCustomerBill);
    for (let i = 0; i < getCustomerBill.length; i++) {
      for (let j = 0; j < getCustomerBill[i].listProduct.length; j++) {
        let product = await Product.findById(getCustomerBill[i].listProduct[j].product);
        const temp = { name: product.name, amount: getCustomerBill[i].listProduct[j].amount, sumprice: product.price * getCustomerBill[i].listProduct[j].amount, buydate: getCustomerBill[i].time };
        arrProduct.push(temp);
      }
    }

    user = { name: user.name, role: user.role, email: user.email, phone: user.phone, address: user.address };
    console.log(user);
    res.status(200).render("customer-page", {
      user: user,
      csspath: "customer-page",
      layout: 'customer',
      arrProduct,
    })
  } catch (error) {
    console.log(error);
  }

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
  const accounts = await User.find({ "username": { $ne: user.username }, active: true }).lean();
  const shops = await Shop.find({}).populate("sellerID").lean();

  res.status(200).render("admin-page", {
    csspath: "admin-page",
    layout: 'admin',
    accounts,
    shops,
  })
});
exports.getAdminProducts = catchAsync(async (req, res, next) => {

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
  const products = await Product.find({ active: true }).populate("shopID").lean();

  res.status(200).render("admin-products", {
    csspath: "admin-page",
    layout: 'admin',
    products,
  })
});
exports.getStatisticsAdmin = catchAsync(async (req, res, next) => {
  try {

    const selledProducts = await Bill.find({}).populate({
      path: "listProduct.product", populate: {
        path: 'shopID',
        model: 'Shop'
      }, model: 'Product'
    }).lean();

    var products = []
    selledProducts.forEach((e) => {
      products = products.concat(e.listProduct)
    })
    var result = [];
    products.reduce((total, value) => {
      if (!total[value.product.shopID._id]) {

        total[value.product.shopID._id] = { shop: value.product.shopID, qty: 0 };
        result.push(total[value.product.shopID._id])
      }
      total[value.product.shopID._id].qty += value.amount;

      return total;
    }, {});

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
    customers.forEach((e) => {
      e.count = e.listProduct.reduce((a, b) => a + b.amount, 0)
    });

    result = [];
    customers.reduce((total, value) => {
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
    var prevMonth = function (dateObj) {
      var tempDateObj = new Date(dateObj);
      if (tempDateObj.getMonth) {
        tempDateObj.setMonth(tempDateObj.getMonth() - 1);
      } else {
        tempDateObj.setYear(tempDateObj.getYear() - 1);
        tempDateObj.setMonth(12);
      }

      return tempDateObj
    };
    var toString = (dateObj) => {
      var month = dateObj.getMonth();

      var year = dateObj.getFullYear();
      if (month === 0) {
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

    var countUser = await (await User.find({ openDate: { $lte: preMonth1 } })).length
    var countShop = await (await Shop.find({ joinDate: { $lte: preMonth1 } })).length
    countUserShop.push({ time: toString(preMonth1), users: countUser, shops: countShop })

    countUser = await (await User.find({ openDate: { $lte: preMonth2 } })).length
    countShop = await (await Shop.find({ joinDate: { $lte: preMonth2 } })).length
    countUserShop.push({ time: toString(preMonth2), users: countUser, shops: countShop })

    countUser = await (await User.find({ openDate: { $lte: preMonth3 } })).length
    countShop = await (await Shop.find({ joinDate: { $lte: preMonth3 } })).length
    countUserShop.push({ time: toString(preMonth3), users: countUser, shops: countShop })

    countUser = await (await User.find({ openDate: { $lte: preMonth4 } })).length
    countShop = await (await Shop.find({ joinDate: { $lte: preMonth4 } })).length
    countUserShop.push({ time: toString(preMonth4), users: countUser, shops: countShop })
    console.log(countUserShop)
    res.status(200).render("admin-statistics", {
      csspath: "admin-page",
      layout: 'admin',
      shops,
      customers,
      countUserShop,
    })
  }
  catch (error) {
    console.log(error);
  }
});
exports.deleteProductAdmin = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  console.log(id)
  await Product.updateOne({ _id: id }, { $set: { active: false } });
  const url = req.session.retUrl || '/admin/products';
  res.redirect(url);
});
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  console.log(id)
  await User.updateOne({ _id: id }, { $set: { active: false } });
  const url = req.session.retUrl || '/admin';
  res.redirect(url);
});
exports.deleteShop = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  await Shop.updateOne({ _id: id }, { $set: { active: false } });
  const url = req.session.retUrl || '/admin';
  res.redirect(url);
});

exports.getShopInfo = catchAsync(async (req, res, next) => {
  try {
    const userID = req.user.id;
    const shop = await Shop.findOne({ sellerID: userID }).select("+joinDate").lean();
    const numProduct = await Product.find({ shopID: shop._id }).count();


    console.log(shop._id);
    const listProduct = await Product.find({ shopID: shop._id });
    const listBill = await Bill.find({});
    let getTotalProductSaled = 0;
    for (let i = 0; i < listBill.length; i++) {
      for (let j = 0; j < listBill[i].listProduct.length; j++) {
        for (let k = 0; k < listProduct.length; k++) {
          console.log(listProduct[k]._id + " -- " + listBill[i].listProduct[j].product);
          if (listProduct[k]._id.toString() === listBill[i].listProduct[j].product.toString()) {
            getTotalProductSaled += listBill[i].listProduct[j].amount;
          }
        }
      }
    }

    if (shop)
      res.render('shop-infor', {
        id: shop._id,
        stylecss: 'shop-infor.css',
        title: 'Thông tin cửa hàng',
        shopName: shop.name,
        shopPhone: shop.phoneContact,
        shopAddress: shop.address,
        shopEstDay: shop.joinDate,
        shopDescribe: shop.description,

        numProduct: numProduct,
        numSaledProduct: getTotalProductSaled,
        overallRating: '0',
        billCanceledRate: '0',
      });
    else {
      res.render("error", {
        message: "Không tìm thấy shop"
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
      let products = await Product.find({ shopID: shop.id }).select("+createdAt").lean();

      for (let i = 0; i < products.length; i++) {
        products[i].images = products[i].images[0];
      }

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
      for (let i = 0; i < cart.length; i++) {
        let product = await Product.findOne({ slug: cart[i].slug }).lean();
        product.price *= +cart[i].amount;
        products.push({ product: product, amount: +cart[i].amount });
        products[i].images = products[i].product.images[0];
      }
      products.forEach(element => {
        totalPrice += element.product.price;
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
exports.getBillList = catchAsync(async (req, res, next) => {

  try {
    const userID = req.user.id;
    const shop = await Shop.findOne({ sellerID: userID }).select("+joinDate").lean();
    let billList = [];
    const listProduct = await Product.find({ shopID: shop._id });
    const listBill = await Bill.find({});

    for (let i = 0; i < listBill.length; i++) {
      for (let j = 0; j < listBill[i].listProduct.length; j++) {
        for (let k = 0; k < listProduct.length; k++) {
          console.log(listProduct[k]._id + " -- " + listBill[i].listProduct[j].product);
          if (listProduct[k]._id.toString() === listBill[i].listProduct[j].product.toString()) {
            let getProduct = await Product.findOne({ _id: listBill[i].listProduct[j].product });
            let getTotalPrice = getProduct.price * listBill[i].listProduct[j].amount;
            let getCustomer = await User.findById(listBill[i].customer._id);
            console.log(getProduct.price + " || " + getTotalPrice + " || " + getCustomer.name)
            billList.push({ 'name': getCustomer.name, 'date': listBill[i].time, 'price': getTotalPrice });
          }
        }
      }
    }

    res.render('bill-infor', {
      stylecss: 'bill-infor.css',
      billList: billList,
    });
  } catch (error) {
    console.log(error);
  }

});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log(id);
    let product = await Product.findByIdAndRemove({ _id: id })
    res.redirect('/product-list');
  }
  catch (error) {
    console.log(error);
  }
});