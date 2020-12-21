const express = require('express');
const controller = require('../controllers/shop.controller')
const authController = require('./../controllers/auth.controller')
const voucherController = require('../controllers/voucher.controller')
const router = express.Router();

router.route('/')
    .get(controller.getAllShops)
    .post(authController.protect,
        authController.restrictTo('seller'),
        controller.setSeller,
        controller.createShop);


router.route('/:id')
    .get(controller.getShop, voucherController.getAllVouchers)
    .patch(authController.protect,
        authController.restrictTo('seller'),
        controller.updateShop)
    .delete(authController.protect,
        authController.restrictTo('seller','admin'),
        controller.deleteShop);

module.exports = router;