const express = require('express');
const controller = require('../controllers/product.controller')
const authController = require('./../controllers/auth.controller')
const router = express.Router();

router.route('/')
   
    .get(controller.getAllProducts)
    .post(authController.protect,
        authController.restrictTo('seller'),
        controller.createProduct);


router.route('/:id')
    .get(controller.getProduct)
    .patch(authController.protect,
        authController.restrictTo('seller'),
        controller.updateProduct)
    .delete(authController.protect,
        authController.restrictTo('seller','admin'),
        controller.deleteProduct);

module.exports = router;