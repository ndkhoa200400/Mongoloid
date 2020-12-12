const Product = require("../model/product.model");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const product = await Product.find();
  let user = res.locals.user;
  user = { name: user.name, email: user.user-mail, role: user.role };
  res.status(200).render("home", {
    title: "Home",
    user: user,
    product,
  });
});
