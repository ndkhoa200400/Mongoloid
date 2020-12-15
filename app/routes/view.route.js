const express = require('express');
const controller = require('../controllers/view.controller');
//const authController = require('../controllers/auth.controller')
const User = require("../model/user.model");
var hbs = require('hbs');

const router = express.Router();



hbs.registerPartials(__dirname + '../views/partials');


router.get('/', controller.getOverview)

router.get('/login', (req, res)=>{
    res.render('login_page',{
        title:'Welcome',
        csspath: 'login_page'
    })
});
module.exports = router;