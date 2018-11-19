var Tweet = require('../../models/tweet.js');

module.exports={

	tweetAction : function(tweetId,tweetCreationDate,content,retweetCount,tweetFavCount,replyCount){

		Tweet.create({

			id : tweetId,
			created_at : tweetCreationDate,
			content : content,
			replies : replyCount,
			retweets : retweetCount,
			likes : tweetFavCount

		},(err,tweet)=>{

			if(err)
				console.log('ERROR ADDING TWEET TO DB');
			else
				console.log(`TWEET ADDED TO DB!\n${tweet}`);
		});
	},

	replyAction : function(tweetId){

		Tweet.findOneAndUpdate({id : tweetId},{ $inc:{replies : 1} },(err , tweet)=>{

		if(err)
			console.log('ERROR UPDATING REPLIES');
		else
			console.log(`REPLIES UPDATED!\n${tweet}`);

		});
	},

	likeAction : function(tweetId){

		Tweet.findOneAndUpdate({id : tweetId},{ $inc:{likes : 1} },(err , tweet)=>{

		if(err)
			console.log('ERROR UPDATING LIKES');
		else
			console.log(`LIKES UPDATED!\n${tweet}`);

		});
	},

	retweetAction : function(tweetId){

		Tweet.findOneAndUpdate({id : tweetId},{ $inc:{retweets : 1} },(err , tweet)=>{

		if(err)
			console.log('ERROR UPDATING RETWEETS');
		else
			console.log(`RETWEETS UPDATED!\n${tweet}`);

		});
	}
	
}