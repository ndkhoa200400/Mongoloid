const mongoose = require("mongoose");
const Product = require("./product.model");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      require: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  // Query
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productID) {
  const stats = await this.aggregate([
    {
      $match: { product: productID },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Product.findByIdAndDelete(productID, {
      ratingsQuanity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndDelete(productID, {
      ratingsQuanity: 0,
      ratingsAverage: 4.5,
    });
  }
};
// Dont let user make same review on same product.
reviewSchema.index({product:1,user:1}, {unique:true});

reviewSchema.post("save", function () {
  this.construction.calcAverageRatings(this.product);
});
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.construction.calcAverageRatings(this.r.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
