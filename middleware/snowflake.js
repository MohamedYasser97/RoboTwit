module.exports = {

	isLoggedIn : (req,res,next)=>{

		if(req.isAuthenticated())
			return next();

		req.flash("error", "You must be signed in to do that!");
		res.redirect("/login");
	},

	isLoggedOut : (req,res,next)=>{

		if(!req.isAuthenticated())
			return next();

		res.redirect("/mainPage");
	},

	isDev : (req,res,next)=>{

		if(req.user.accType == 'developer')
			return next();

		req.flash("error", "You must have a developer account to do that!");
		res.redirect("/mainPage");
	},
	isAdmin : (req,res,next)=>{
		if(req.user.username == 'admin')
		return next();

		res.redirect("/mainPage");
	}
}
