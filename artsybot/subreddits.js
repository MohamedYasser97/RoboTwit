module.exports={

	//Enter the names of all the subreddits you want the bot to tweet images from. Returns a random subreddit name
	randomSubreddit : function(){

		var subreddits = [//'ImaginaryLandscapes',
						  //'ImaginaryCharacters',
						  //'SpecArt',
						  //'Watercolor',
						  //'ImaginaryMonsters',
						  'blackandwhite',
						  //'Illustration',
						  'Art',
						  //'ImaginaryTechnology',
						  //'alternativeart',
						  //'analog',
						  //'VaporwaveAesthetics',
						  //'Cyberpunk',
						  'ArtPorn',
						  //'drawing',
						  //'glitch_art',
						  //'EarthPorn',
						  //'HistoryPorn',
						  //'CityPorn',
						  'Sizz',
						  'ImaginaryColorscapes',
						  'ImaginaryFeels',
						  //'PopArtNouveau',
						  //'ImaginaryMindscapes',
						  //'painting',
						  //'aesthetic',
						  //'spaceporn',
						  //'ExposurePorn',
						  //'PixelArt',
						  //'noir',
						  //'unixporn',
						  'Heavymind'
						  //'ClassicalNudes',
						  //'LaBeauteFeminine'
						  //'PrettyGirls',
						  //'gentlemanboners',
						  //'DrugArt',
						  //'beadsprites',
						  //'creepy',
						  //'ImaginaryWorlds',
						  //'ImaginaryWeather',
						  //'ImaginarySeascapes',
						  //'ImaginaryCityscapes',
						  //'ImaginaryPathways',
						  //'ApocalypsePorn',
						  ];

		return subreddits[Math.floor(Math.random() * subreddits.length)];
	}
}