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

Websocket = (function(base) {

	function Websocket(robot) {
		this.robot = robot;
		Websocket.prototype = Object.create(base);
	}


	Websocket.prototype.send = function(msg) {
		console.log(msg);
		this.socket.send(JSON.stringify(msg));
	};

	Websocket.prototype.reply = function(msg) {
	};

	Websocket.prototype.run = function() {
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

	return Websocket;

})(Adapter);


module.exports.use = function(robot) {
	return new Websocket(robot);
};