var Adapter = require("../adapter"),
	Message = require("../message");

Shell = (function(base) {

	function Shell(robot) {
		this.robot = robot;
		Shell.prototype = Object.create(base);
	}


	Shell.prototype.send = function(msg) {
		console.log(toString(msg[0].msg));
		process.stdout.write(toString(msg[0].msg));
	};

	Shell.prototype.run = function() {
		var that = this,
			stdin = process.openStdin();
		stdin.setEncoding("utf8");

		stdin.on("data", function(chunk) {
			var msg = new Message(chunk);

			that.robot.receive(msg);
		});

	};


	return Shell;

})(Adapter);

module.exports.use = function(robot) {
	return new Shell(robot);
};