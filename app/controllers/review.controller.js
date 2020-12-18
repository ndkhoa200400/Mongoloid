const Review = require("./../model/review.model");
//const catchAsync = require('./../utils/catchAsync');
const factory = require("./handlerFactory");

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.product) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id; // USER ID from protect middleware
  next();
};

exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);
