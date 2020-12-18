const express = require("express");
const controller = require("../controllers/review.controller");
const router = express.Router({ mergeParams: true });   // Trộn route để bên Product gửi router qua này
const authController = require("../controllers/auth.controller");

// ROUTE: /productId/reviews
// ROUTE: /reviews
router.use(authController.protect);

router
  .route("/")
  .get(controller.getAllReviews)
  .post(
    authController.restrictTo("user"),
    controller.setTourUserIds,
    controller.createReview
  );
router
  .route("/:id")
  .get(controller.getReview)
  .delete(authController.restrictTo("user", "admin"), controller.deleteReview)
  .patch(authController.restrictTo("user"), controller.updateReview);
module.exports = router;
