var express = require("express");
var router  = express.Router();
var fs = require('fs');
var passport = require("passport");
var user = require("../models/user");
var snowflake = require('../middleware/snowflake.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('../controllers/controllers');

router.get("/",snowflake.isLoggedOut,(req, res)=>{
   res.render("homePage.ejs");
});

router.get("/admin",snowflake.isAdmin,snowflake.isLoggedIn,(req,res)=>{
	res.render("admin.ejs");
});

router.get("/about",(req,res)=>{
	res.render("about.ejs");
});

router.get("/signup", snowflake.isLoggedOut,(req,res)=>{
  res.render("signup.ejs");
});

router.get("/login",snowflake.isLoggedOut,(req,res)=>{
	res.render("login.ejs");
});

router.get("/contact", (req,res)=>{
  res.render("contact.ejs");
});

router.get("/mainPage/search",snowflake.isLoggedIn,controller.mainPageSearch,(req,res)=>{
	res.redirect('/mainPage');
});

router.get("/mainPage/discover",snowflake.isLoggedIn,controller.mainPageDiscover,(req,res)=>{	
	res.redirect('/mainPage');
});

router.get("/mainPage/popular",snowflake.isLoggedIn,controller.mainPagePopular,(req,res)=>{	
	res.redirect('/mainPage');
});

router.get("/mainPage",snowflake.isLoggedIn,(req,res)=>{
  res.render("mainPage.ejs");
});

router.get("/mainPage/refresh",snowflake.isLoggedIn,controller.mainPageRefresh,(req,res)=>{

});

router.get("/bot",snowflake.isLoggedIn,snowflake.isDev,controller.bot,(req,res)=>{
	res.redirect('/mainPage');
});

router.get("/mainPage/update",snowflake.isLoggedIn,controller.mainPageUpdate,(req,res)=>{

});

router.get("/settings",snowflake.isLoggedIn, (req,res)=>{
  res.render("settings.ejs");
});

router.get("/home", (req,res)=>{
  res.redirect("/");
});

router.post("/registration",snowflake.isLoggedOut,controller.registration, (req,res)=>{

});

router.post("/login",snowflake.isLoggedOut,passport.authenticate("local",{successRedirect:"/mainPage",failureRedirect:"/login",failureFlash: 'Invalid username or password.'}), (req,res)=>{
	user.findOneAndUpdate({username : req.user.username},{$set:{searchQuery:''}},{new: true, useFindAndModify: false},(err,data)=>{if(err);});
});

router.get("/logout",snowflake.isLoggedIn,controller.logout, (req,res)=>{
  res.redirect("/");
});

router.get("/admin/getUsers",snowflake.isLoggedIn,snowflake.isAdmin,controller.adminGetUsers,(req,res)=>{

});

router.get("/admin/getTweets",snowflake.isLoggedIn,snowflake.isAdmin,controller.adminGetTweets,(req,res)=>{

});

router.post("/changepicture",snowflake.isLoggedIn,multipartMiddleware,controller.uploadimage,(req,res)=>{
  res.redirect("/settings");
});

router.post("/changeemail",snowflake.isLoggedIn,multipartMiddleware,controller.updatingemail,(req,res)=>{
  res.redirect("/settings");
});

router.post("/changePassword",snowflake.isLoggedIn,controller.updatingpassword,(req,res)=>{
  res.redirect("/settings");
});

router.post("/changeTwitterSettings",snowflake.isLoggedIn,snowflake.isDev,controller.changeTwitterSettings,(req,res)=>{
  res.redirect("/settings");
});

module.exports = router;
