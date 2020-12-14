
const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  var user = await User.find();
  var product = await Product.find({}, {
    images: 1,
    name : 1,
    price :1
  });

  //user = { name: user.username, email: user.email, role: user.role };
  res.status(200).render("category", {
    title: "Category",
    user: user,
    products : product,
    empty: product.empty,
    csspath : "category-page",
    layout: 'default',
    images : images,
    name: name,
    price : price
  });
});

exports.getUser = catchAsync(async (req, res, next) => {

});

