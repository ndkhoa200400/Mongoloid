const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");
const productController = require("./product.controller");
const axios = require("axios");
const { join } = require("path");
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

  res.status(200).render("category", {
    title: "Category",
    products: product,
    empty: product.empty,
    csspath: "category-page",
    layout: "default",
    user: user,
  });
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
  const data = await axios({
    method: "GET",
    url: "http://localhost:8000/api/product/search?q=" + req.query.q,
  });
  console.log(data)
  res.status(200).render("category", {
    title: "Category",
    products: data.data.data,
   
    csspath: "category-page",
    layout: "default",
    user: user,
  });
});
