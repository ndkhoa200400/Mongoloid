
const User = require("../model/user.model");
const Product = require("../model/product.model");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  var user = await User.find().lean();
  var product = await Product.find().lean();
  console.log(product);
  //user = { name: user.username, email: user.email, role: user.role };
  res.status(200).render("category", {
    title: "Category",
    user: user,
    products : product,
    empty: product.empty,
    csspath : "category-page",
    layout: 'default',
  });
});

exports.getUser = catchAsync(async (req, res, next) => {

});

