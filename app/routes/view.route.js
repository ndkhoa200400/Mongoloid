const express = require('express');
const controller = require('../controllers/view.controller');
//const authController = require('../controllers/auth.controller')
const User = require("../model/user.model");
var hbs = require('hbs');

const router = express.Router();

router.use(express.static('public'));

hbs.registerPartials(__dirname + '../views/partials');


router.get('/', controller.getOverview);

// router.get('/', async (req, res, next) => {
//   const user = await User.find();
//   let user = res.locals.user;
  
//   res.status(200).render("category", {
//     layout: 'default',
//     title: 'Category',
//     csspath : "category-page",
//     jspath : "category-page",
//     user : user
//   })
// });

module.exports = router;