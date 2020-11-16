const express = require('express');
const controller = require('../controllers/product.controller')
const router = express.Router();

router.route('/')
    //.get(authController.protect,
    .get(controller.getAllProducts)
    .post(controller.createProduct);


router.route('/:id')
    .get(controller.getProduct)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct);
    //.delete(authController.protect,
    //        authController.restrictTo('admin', 'leade-guide'),
    //        controller.deleteTour);

module.exports = router;