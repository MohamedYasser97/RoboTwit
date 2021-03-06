var Twit = require('twit');
var botConfig = require('./config-bot');
var tweeter = require('./tweeter');
var log = require('./logger');

//create a new object from the package and make it public for other modules
var T = new Twit(botConfig.config);
module.exports.T=T;

log('* The bot started successfully!\r\n\r\n----------------------------------------------------------');

tweeter.tweetImage();

function initAnalyzer(tests){

	var analyze = require('./analyzer');
	log(`* Analysis started! Check analysis logs\r\n    -> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()},${new Date().toLocaleString('en-GB',{timezone: 'Africa/Cairo',hour12: true}).split(',').pop()}\r\n----------------------------------------------------------------------------------------------------------------------------`);
	analyze(tests);
}

//Uncomment the following code to start analysis
//initAnalyzer(100);
