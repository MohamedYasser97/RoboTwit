var action = require('./actions');
var main = require('../../index.js');

//the code that handles the different events that happened in the main bot file
module.exports={

	//parses the JSON data of any tweet involving the bot and then acts accordingly using the actions module
	tweeted : function (eventMsg){

		var content = eventMsg.text;
		var username = eventMsg.user.screen_name;

		var replyToUserName = eventMsg.in_reply_to_screen_name;
		var replyToStatusId = eventMsg.in_reply_to_status_id_str;
		var tweetCreationDate = eventMsg.created_at;
		var tweetId = eventMsg.id_str;

		var quoteCount = eventMsg.quote_count;
		var replyCount = eventMsg.reply_count;
		var retweetCount = eventMsg.retweet_count;
		var tweetFavCount = eventMsg.favorite_count;

		if(replyToUserName == main.currUser && username!= main.currUser)
			action.replyAction(tweetId);
		else
			action.tweetAction(tweetId,tweetCreationDate,content,retweetCount,tweetFavCount,replyCount);
	},

	liked : function(eventMsg){

			var tweetId = eventMsg.id_str;

			action.likeAction(tweetId);
	},

	retweet : function(eventMsg){

			var tweetId = eventMsg.id_str;

			action.retweetAction(tweetId);
	}
}