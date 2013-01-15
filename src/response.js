var Response = (function() {

	function Response(robot, message, matches) {
		this.robot = robot;
		this.message = message;
		this.match = matches;
	}

	Response.prototype = {

		send: function() {
			var msg = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
			this.robot.adapter.send(msg);
		},
		http: function(url) {
			return this.robot.http(url);
		}
	};

	return Response;

})();


module.exports = Response;