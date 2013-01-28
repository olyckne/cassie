var exec = require("child_process").exec;

module.exports = function(robot) {

	robot.respond(/cassie uptime/i, function(msg) {
		var date = new Date(process.uptime()*1000),
			hours = date.getUTCHours(),
			minutes = date.getUTCMinutes(),
			seconds = date.getUTCSeconds(),
			string = "";
			hours += hours > 1 ? " hours" : " hour";
			minutes += minutes > 1 ? " minutes" : " minute";
			seconds += seconds > 1 ? " seconds" : " second";

			string = hours + " " + minutes + " " + seconds;
		msg.send(string);
	});

	robot.respond(/computer uptime/i, function(msg) {
		var uptime = exec("uptime", function(error, stdout, stderr) {
			msg.send(stdout);
			if(stderr) msg.send(stderr);
			if(error) msg.send(error);
		});
	});
};