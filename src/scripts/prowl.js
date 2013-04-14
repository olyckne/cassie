var Prowl = require('prowler');

module.exports = function(robot) {

	robot.respond(/prowl (.*)/i, function(msg) {
		var notification = new Prowl.connection(robot.config.prowl.apiKey);

		notification.send({
			'application' : 'Cassie',
			'event': 'message',
			'description': msg.match[1]
		});
	});

};