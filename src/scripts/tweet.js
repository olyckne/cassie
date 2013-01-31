module.exports = function(robot) {
	robot.respond(/tweet (.*)/i, function(msg) {
		var search = msg.match[1];

		return msg.http('http://search.twitter.com/search.json').query({
			q: search
		}).get()(function(err, res, body) {
			var tweets, tweet;
			tweets = JSON.parse(body);

			if(tweets.results && tweets.results.length > 0) {
				tweet = tweets.results[0];
				return msg.send("@"+tweet.from_user+": "+tweet.text);
			} else {
				return msg.send("Didn't find tweets...");
			}
		});
	});
};