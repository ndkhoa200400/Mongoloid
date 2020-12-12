const express = require('express');
// const controller = require('../controllers/view.controller');
// const authController = require('../controllers/auth.controller')
var hbs = require('hbs');

const router = express.Router();

router.use(express.static('public'));

hbs.registerPartials(__dirname + '../views/partials');

// router.use(authController.isLoggedIn);

// router.get('/', controller.getOverview);

router.get('/login', (req,res)=>{
  res.render('login_page',{
    layout: 'login',
    title: 'Login'
  });
})

router.get('/', function(req,res){
  res.render('category',{
    layout: 'default',
    title: 'Home'
  });
});

module.exports = router;