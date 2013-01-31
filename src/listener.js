var Listener = (function() {

	function Listener(robot, regex, callback) {
		this.robot = robot;
		this.regex = regex;
		this.callback = callback;
	}

	Listener.prototype = {

		call: function(msg) {
			var matches = msg.match(this.regex);
			if(matches) {
				this.callback( new this.robot.Response(this.robot, msg, matches));
				return true;
			} else {
				return false;
			}
		}
	};


	return Listener;
})();


module.exports = Listener;