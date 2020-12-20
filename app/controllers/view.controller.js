const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");
const productController = require("./product.controller");
const axios = require("axios");
const url = require("url");
const Shop = require("../model/shop.model");





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
  const category = await Product.find({}).distinct("category").populate("category").lean({virtuals: true});
  res.status(200).render("category", {
    title: "Category",
    category,
    products: product,
    empty : product === null,
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
  if (user) user = { name: user.name, email: user.email, role: user.role };
  const category = await Product.find({}).distinct("category").populate("category").lean({virtuals: true});
  res.status(200).render("category", {
    title: catName,
    category,
    products: product,
    user: user,
    empty : product === null,
    csspath : "category-page",
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

  if (response.data.status === "success") {
    res.status(200).render("category", {
      title: "Category",
      products: response.data.data.docs,
      category,
      empty : product === null,
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
    path:"shopID"
  })
  .lean();

  const category = await Product.find({}).distinct("category").populate("category").lean({virtuals: true});
  res.status(200).render("product-page", {
    title: "Sản phẩm",
    category,
    empty : product === null,
    product: product,
    // /activeImg: product.toArray().images,
    user: user,
    csspath: "product-page",
    jspath: "product-page",
    layout: "default",
  });
});
