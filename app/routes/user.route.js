const express = require("express");
const authController = require("../controllers/auth.controller");
const controller = require("../controllers/user.controller");
const User = require("../model/user.model");

const router = express.Router();
router.use(express.static('public'));

router.get('/login', (req,res)=>{
  res.render('login_page',{
    layout: false,
    title: 'Login'
  });
})

router.post("/login", async function (req, res) {
  if (authController.signup){
    console.log(req.body);
    res.redirect('/');
  }
    
})

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:id", authController.resetPassword);

// Protect all routers after this middleware
router.use(authController.protect);

router.patch('/beSeller', controller.beSeller);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", controller.getMe, controller.getUser);
router.patch("/updateMe", controller.updateMe);
router.delete("/deleteMe", controller.deleteMe);

// Only admin can use these routes
router.use(authController.restrictTo("admin"));
router.route("/").get(controller.getAllUsers);

router
  .route("/:id")
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
