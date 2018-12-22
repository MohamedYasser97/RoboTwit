var express = require("express");
var router  = express.Router();
var fs = require('fs');
var passport = require("passport");
var user = require("../models/user");
var snowflake = require('../middleware/snowflake.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('../models/controller');
var imgPath = "./uploads/";
var tweet = require("../models/tweet");
var Twit = require('twit');
var config = require('../middleware/twitter/config.js');

var searchQuery='';
var searchName='';

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

router.get("/mainPage/search",snowflake.isLoggedIn,(req,res)=>{

	var searchWord = req.query.searchField;

	if(searchWord==''){
		searchQuery = `from:${req.user.username}+-filter:retweets+-filter:replies`;
		searchName = req.user.username

	}else if(searchWord[0]=='@'){
		searchQuery = `from:${searchWord.substring(1,searchWord.length)}+-filter:retweets+-filter:replies`;
		searchName = searchWord.substring(1,searchWord.length);
	}
	else{
		searchQuery = `"${searchWord}"+-filter:retweets+-filter:replies`;
	}

	res.redirect('/mainPage');
});

router.get("/mainPage/discover",snowflake.isLoggedIn,(req,res)=>{

	searchQuery = '-filter:retweets+-filter:replies';
	
	res.redirect('/mainPage');
});

router.get("/mainPage/popular",snowflake.isLoggedIn,(req,res)=>{

	searchQuery = '-filter:retweets+-filter:replies+min_retweets:5000+min_faves:5000';
	
	res.redirect('/mainPage');
});

router.get("/mainPage",snowflake.isLoggedIn,(req,res)=>{
  res.render("mainPage.ejs");
});

router.get("/mainPage/refresh",snowflake.isLoggedIn,(req,res)=>{

		var T = new Twit(config);

		if(searchQuery=='')
			searchQuery=`from:${req.user.username}+-filter:retweets+-filter:replies`;

		T.get('search/tweets', { result_type: 'recent',q: searchQuery, count: 100 }, function(err, data, response) {
  			//console.log(data);

  			var tweetsId = [];
  			var tweetsLikes = [];
  			var tweetsRetweets = [];
  			var tweetSource = [];

  			data.statuses.forEach(function(obj){

  					var newData = {
  					id : obj.id_str,
   					created_at : obj.created_at,
				    content : obj.text,
				    replies : '',
				    retweets : obj.retweet_count,
				    likes : obj.favorite_count,
				    source : (obj.source).substring(obj.source.indexOf('>')+1 , obj.source.lastIndexOf('<'))
  					};

  				tweetsId.push(obj.id_str);
  				tweetsLikes.push(obj.favorite_count);
  				tweetsRetweets.push(obj.retweet_count);
  				tweetSource.push((obj.source).substring(obj.source.indexOf('>')+1 , obj.source.lastIndexOf('<')));

  				tweet.countDocuments({id: obj.id_str}, function (err, count){
				    if(count>0){

				        tweet.findOneAndUpdate({id: obj.id_str}, {$set: newData},{new: true, useFindAndModify: false},(err,data)=>{
					            if(err)
					            console.log(err);
          				});

				    }else{

							tweet.create(newData , (err,tweet)=>{
								if(err)//"ERROR ADDING TWEET TO DB!"
									console.log(err);
								else
									console.log(`TWEET ADDED TO DB SUCCESSFULLY \n ${tweet}`);
						});
				    }
				});

  			});

 			var response = {ids : tweetsId , likes : tweetsLikes , retweets : tweetsRetweets, source : tweetSource};
  			//res.type('.js');
  			res.send(response);
		});

});

router.get("/userInfo",snowflake.isLoggedIn,(req,res)=>{

	var T = new Twit(config);

	T.get("followers/ids",{screen_name : searchName},{

	});
});

var botProcess=0;
router.get("/bot",snowflake.isLoggedIn,snowflake.isDev,(req,res)=>{

	if(botProcess==0){
		//botProcess=require('child_process').spawn('botStarter.bat');
		require('../artsybot/bot.js');
		botProcess = setInterval(()=>{require('../artsybot/bot.js')},1000*60);

	}else{

		clearInterval(botProcess);
		botProcess=0;
	}

	res.redirect('/mainPage');
});

router.get("/mainPage/update",snowflake.isLoggedIn,(req,res)=>{

	var T = new Twit(config);

	if(searchQuery=='')
		searchQuery=`from:${req.user.username}+-filter:retweets+-filter:replies`;

	T.get('search/tweets', { result_type: 'recent',q: searchQuery, count: 100 }, function(err, data, response) {
  			//console.log(data);

  			var tweetsId = [];
  			var tweetsLikes = [];
  			var tweetsRetweets = [];
  			var tweetSource = [];

  			data.statuses.forEach(function(obj){

  					var newData = {
  					id : obj.id_str,
   					created_at : obj.created_at,
				    content : obj.text,
				    replies : '',
				    retweets : obj.retweet_count,
				    likes : obj.favorite_count,
				    source : (obj.source).substring(obj.source.indexOf('>')+1 , obj.source.lastIndexOf('<'))
  					};

  				tweetsId.push(obj.id_str);
  				tweetsLikes.push(obj.favorite_count);
  				tweetsRetweets.push(obj.retweet_count);
  				tweetSource.push((obj.source).substring(obj.source.indexOf('>')+1 , obj.source.lastIndexOf('<')));

  				tweet.countDocuments({id: obj.id_str}, function (err, count){
				    if(count>0){

				        tweet.findOneAndUpdate({id: obj.id_str}, {$set: newData},{new: true, useFindAndModify: false},(err,data)=>{
					            if(err)
					            console.log(err);
          				});

				    }else{

							tweet.create(newData , (err,tweet)=>{
								if(err)//"ERROR ADDING TWEET TO DB!"
									console.log(err);
								else
									console.log(`TWEET ADDED TO DB SUCCESSFULLY \n ${tweet}`);
						});
				    }
				});

  			});

		});

	tweet.find({id: req.query.tweetId}).then(doc => {

    	res.send({likes : doc[0].likes , retweets : doc[0].retweets, source : doc[0].source});

  	});

});


router.get("/settings",snowflake.isLoggedIn, (req,res)=>{
  res.render("settings.ejs");
});

router.get("/home", (req,res)=>{
  res.redirect("/");
});


//Authentication Routes

router.post("/registration", (req,res)=>{

	//PASSPORT AUTOMATICALLY HANDLES DUPLICATED USERNAMES!

	var newUser = new user({
    image:"",
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		gender: req.body.gender,
		accType: req.body.accType
	});
	user.register(newUser , req.body.password , (err,user)=>{

		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/signup");
		}

		passport.authenticate("local")(req,res, ()=>{

			res.redirect("/mainPage");
		});
	});
});


router.post("/login", passport.authenticate("local",
{
	successRedirect:"/mainPage",
	failureRedirect:"/login",
	failureFlash: 'Invalid username or password.'
}), (req,res)=>{

});

router.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
});

router.get("/admin/getUsers",(req,res)=>{

  user.find().then(doc => {
      //res.send({username : doc[0].username , firstName : doc[0].firstName, lastName : doc[0].lastName, email : doc[0].email, gender : doc[0].gender, accType : doc[0].accType});
      res.send(doc);
      console.log(doc);
    });

});

router.get("/admin/getTweets",(req,res)=>{

  tweet.find().then(doc => {
      //res.send({username : doc[0].username , firstName : doc[0].firstName, lastName : doc[0].lastName, email : doc[0].email, gender : doc[0].gender, accType : doc[0].accType});
      res.send(doc);
      console.log(doc);
    });

});

router.post("/changepicture",multipartMiddleware,controller.uploadimage,(req,res)=>{
  res.redirect("/settings");
});

router.post("/changeemail",multipartMiddleware,controller.updatingemail,(req,res)=>{
  res.redirect("/settings");
});

router.post("/changePassword",multipartMiddleware,controller.updatingpassword,(req,res)=>{
  res.redirect("/settings");
});

module.exports = router;