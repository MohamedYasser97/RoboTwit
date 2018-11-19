var Twit = require('twit');
var config = require('./config');
var handler = require('./handlers');


//create a new object from the package and make it public for other modules
var T = new Twit(config);
module.exports.T=T;

var stream = T.stream('user');

//wait for different types of events (see more in Twit's documentation)

stream.on('tweet',handler.tweeted);
stream.on('favorite',handler.liked);
