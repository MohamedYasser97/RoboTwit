var cloudinary = require('cloudinary');
var user = require('../models/user');
var tweet = require("../models/tweet");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var routes = require('../routes/routes');
var Twit = require('twit');
var config = require('../artsybot/config.js');
var botConfig = require('../artsybot/config-bot.js');

cloudinary.config({
    cloud_name: 'robotwit',
    api_key: '363337851544293',
    api_secret: 'jF9tJ5Mw-LfC5NoQbu49DkHfgxw'
});

module.exports = {
  uploadimage: function (req, res,next) {
      // Use Cloudinary uploader to upload to cloudinary sever
      // Access files uploaded from the browser using req.files
      cloudinary.uploader.upload(req.files.image.path, function(result) {
          // Create a post model
          // by assembling all data as object
          // and passing to Model instance
          user.findOneAndUpdate({username : req.user.username},{$set:{image:result.url}},{new: true, useFindAndModify: false},(err,data)=>{
            if(err)
            console.log(err);
          //  else
          //  console.log(data)
          });
        //  console.log(req.user.username);
        //  console.log(result.url);
        //  console.log(req.user);
          return next();
      });
  },

  updatingemail:function(req,res,next){
    user.findOneAndUpdate({username : req.user.username},{$set:{email:req.body.email}},{new: true, useFindAndModify: false},(err,data)=>{
      if(err)
      console.log(err);
    });
    return next();
  },

 updatingpassword: function(req,res,next){

  user.findByUsername(req.user.username).then(function(sanitizedUser){

    if (sanitizedUser)
        sanitizedUser.setPassword(req.body.password, function(){
            sanitizedUser.save();         
        });
  },function(err){
    console.log(err);
  });

   return next();
   
 },

 mainPageSearch : function(req,res,next){

    var searchWord = req.query.searchField;

    if(searchWord==''){
      routes.searchQuery = `from:${req.user.username}+-filter:retweets+-filter:replies`;
      routes.searchName = req.user.username

    }else if(searchWord[0]=='@'){
      routes.searchQuery = `from:${searchWord.substring(1,searchWord.length)}+-filter:retweets+-filter:replies`;
      routes.searchName = searchWord.substring(1,searchWord.length);
    }
    else{
      routes.searchQuery = `"${searchWord}"+-filter:retweets+-filter:replies`;
    }

    return next();
 },

 mainPageDiscover : function(req,res,next){

    routes.searchQuery = '-filter:retweets+-filter:replies';

    return next();
 },

 mainPagePopular : function(req,res,next){

    routes.searchQuery = '-filter:retweets+-filter:replies+min_retweets:1000+min_faves:5000';

    return next();
 },

 mainPageRefresh : function(req,res,next){

        var T = new Twit(config);

        if(routes.searchQuery=='')
          routes.searchQuery=`from:${req.user.username}+-filter:retweets+-filter:replies`;

        T.get('search/tweets', { result_type: 'recent',q: routes.searchQuery, count: 100 }, function(err, data, response) {
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
 },

 bot : function(req,res,next){

      if(routes.botProcess==0){

        botConfig.config= {consumer_key:req.user.consumerKey , consumer_secret:req.user.consumerSecret,access_token:req.user.accessToken,access_token_secret:req.user.accessTokenSecret};

        require('../artsybot/bot.js');
        routes.botProcess = setInterval(()=>{require('../artsybot/bot.js')},1000*60);

      }else{

        clearInterval(routes.botProcess);
        routes.botProcess=0;
      }
 },

 mainPageUpdate : function(req,res,next){

        var T = new Twit(config);

        if(routes.searchQuery=='')
          routes.searchQuery=`from:${req.user.username}+-filter:retweets+-filter:replies`;

        T.get('search/tweets', { result_type: 'recent',q: routes.searchQuery, count: 100 }, function(err, data, response) {
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

 },

 registration : function(req,res,next){

        //PASSPORT AUTOMATICALLY HANDLES DUPLICATED USERNAMES!

        var newUser = new user({
          image:"",
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          accType: req.body.accType,
          consumerKey : '',
          consumerSecret: '',
          accessToken : '',
          accessTokenSecret: ''
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
 },

 logout : function(req,res,next){

      routes.searchQuery='';
      routes.searchName='';
      routes.botProcess=0;

      req.logout();

      return next();
 },

 adminGetUsers : function(req,res,next){

      user.find().then(doc => {
          res.send(doc);
        });
 },

 adminGetTweets : function(req,res,next){

      tweet.find().then(doc => {
          res.send(doc);
        });
 },

 changeTwitterSettings : function(req,res,next){

    user.findOneAndUpdate({username : req.user.username},{$set:{consumerKey:req.body.consumerKey , consumerSecret:req.body.consumerSecret,accessToken:req.body.accessToken,accessTokenSecret:req.body.accessTokenSecret}},{new: true, upsert: true, useFindAndModify: false},(err,data)=>{
      if(err)
      console.log(err);
    });
    return next();
 }

};
