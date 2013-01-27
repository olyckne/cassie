var Adapter = require("../adapter"),
	io	= require("socket.io"),
	Message = require("../message");

 /**
 * Interface for a chat source
 *
 * @class Adapter
 * @constructor
 *
 */

WebsocketIO = (function(base) {

	function WebsocketIO(robot) {
		this.robot = robot;
		WebsocketIO.prototype = Object.create(base);
	}


	WebsocketIO.prototype.send = function(msg) {
		console.log(msg);
		this.socket.send(msg);
	};

	WebsocketIO.prototype.reply = function(msg) {
	};

	WebsocketIO.prototype.run = function() {
		var that = this,
			sio = io.listen(this.robot.server);
		sio.on("connection", function(socket) {
			that.socket = socket;
			that.send("Welcome!");
			socket.on("disconnect", function() {
				sio.sockets.emit("User disconnected");
			});

			socket.on("message", function(data) {
				var msg = new Message(data);
				console.log(data);

				that.robot.receive(msg);
			});
		});
	};

	return WebsocketIO;

})(Adapter);


module.exports.use = function(robot) {
	return new WebsocketIO(robot);
};