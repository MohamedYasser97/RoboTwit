var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({

	image: String,/////////////////////////////////////////////////////////////////////////
	firstName : String,
	lastName : String,
	username : String,
	email : String,
	password : String,
	gender : String,
	accType : String,
	consumerKey : String,
	consumerSecret: String,
	accessToken : String,
	accessTokenSecret: String,
	searchQuery: String,
	botStatus: Number
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);

// User.create({

// 	firstName : "Andrew",
// 	lastName : "Nagy",
// 	username : "lalo",
// 	email : "hamboksha@mizo.com",
// 	password : "idontlikeml",
// 	gender : "idk",
// 	accType : "developer"
// } , (err,user)=>{
// 		if(err)
// 			console.log("ERROR ADDING USER TO DB!");
// 		else
// 			console.log(`USER ADDED TO DB SUCCESSFULLY \n ${user}`);
// });
