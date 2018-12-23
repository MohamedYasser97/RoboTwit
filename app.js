var express = require("express");
var bodyParser  = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var flash = require('connect-flash');
var user = require("./models/user");
var botConfig = require('./artsybot/config-bot');

var app = express();
const port = 3000;

setInterval(()=>{

	user.find().then(doc => {
    	
    	doc.forEach(function(obj){

    		if(obj.botStatus==1){
    			botConfig.config= {consumer_key:obj.consumerKey , consumer_secret:obj.consumerSecret,access_token:obj.accessToken,access_token_secret:obj.accessTokenSecret};
    			require('./artsybot/bot.js');
    		}
        
    	});
    });

},1000*60);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
/////////////////////////////////////////////////////////////////////////
const mongoURI = "mongodb://localhost/robotwit";
const conn = mongoose.connect(mongoURI,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
/////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(flash());
//passport config
app.use(require("express-session")({
	secret: "There must be some kind of a way outta here....said the joker to the thief",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//send currentUser and flash status to each page
 app.use((req,res,next)=>{

 	res.locals.currentUser = req.user;
 	res.locals.success = req.flash('success');
   	res.locals.error = req.flash('error');
   	res.locals.currentPath = req.path;
 	next();
 });

var routes = require('./routes/routes.js');
app.use("",routes);
app.listen(port, ()=> {
	console.log(`The server is listening to you! \nPort: ${port}`);
});
