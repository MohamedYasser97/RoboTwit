var cloudinary = require('cloudinary');
var User = require('./user');
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

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
          User.findOneAndUpdate({username : req.user.username},{$set:{image:result.url}},{new: true, useFindAndModify: false},(err,data)=>{
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
    User.findOneAndUpdate({username : req.user.username},{$set:{email:req.body.email}},{new: true, useFindAndModify: false},(err,data)=>{
      if(err)
      console.log(err);
    });
    return next();
  },

 updatingpassword: function(req,res,next){

  User.findByUsername(req.user.username).then(function(sanitizedUser){

    if (sanitizedUser)
        sanitizedUser.setPassword(req.body.password, function(){
            sanitizedUser.save();         
        });
  },function(err){
    console.log(err);
  });

   return next();
   
 }
};
