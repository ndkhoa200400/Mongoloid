
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

exports.ProByCat = catchAsync(async (req, res, next) => {
  const catName = req.param('cat');
  const product = await Product.find({ category: catName })
    .lean({ virtuals: true });
  
  let user = res.locals.user;
  console.log(product);
  if (user) user = { name: user.name, email: user.email, role: user.role };

  res.status(200).render("category", {
    title: catName,
    product: product,
    user: user,
    empty : product === null,
    csspath : "category-page",
    layout: 'default',
    // num : course thả chổ để length course cho tao!
  });
});

