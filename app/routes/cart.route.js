const express = require('express');
const controller = require('../controllers/cart.controller')
const authController = require("./../controllers/auth.controller")
const viewController = require('./../controllers/view.controller');
const router = express.Router();

router.use(authController.protect);
router.get('/', viewController.getCart)
router.post('/add', controller.addToCart);


module.exports=router;