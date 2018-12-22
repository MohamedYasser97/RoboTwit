var mongoose = require("mongoose");

var tweetSchema = new mongoose.Schema({

    id : String,
    created_at : String,
    content : String,
    retweets : Number,
    likes : Number,
    source : String
});

module.exports = mongoose.model("Tweet",tweetSchema);

// Tweet.create({

// 	id : '123',
//     created_at : '12/12/12',
//     content : 'hambokshaaaa',
//     replies : '',
//     retweets : 3,
//     likes : 2,
// } , (err,tweet)=>{
// 		if(err)
// 			console.log("ERROR ADDING TWEET TO DB!");
// 		else
// 			console.log(`TWEET ADDED TO DB SUCCESSFULLY \n ${tweet}`);
// });