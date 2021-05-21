const express = require('express');
const controller = require('../controllers/product.controller')
const authController = require('./../controllers/auth.controller')
const reviewRouter = require('./review.route');
const router = express.Router();
const upload = require("../utils/multer")
router.post('/rating/:id', authController.protect, controller.ratingProduct);
router.route('/')
    .get(controller.getAllProducts)
    .post(authController.protect,
        upload.array('images'),
        authController.restrictTo('seller'),
        controller.setShop,
        controller.createProduct);

router.get("/search", controller.search);
router.route('/:id')
    .get(controller.getProduct)
    .patch(authController.protect,
        authController.restrictTo('seller'),
        controller.updateProduct)
    .delete(authController.protect,
        authController.restrictTo('seller', 'admin'),
        controller.deleteProduct);

router.use("/:productID/reviews", reviewRouter);

module.exports = router;