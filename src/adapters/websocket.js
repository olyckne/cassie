var Adapter = require("../adapter"),
	io	= require("socket.io");

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
		this.socket.emit("message", "bla "+msg);
	};

	Websocket.prototype.reply = function(msg) {
		this.socket.emit("message", msg);
	};

	Websocket.prototype.run = function() {
		var that = this,
			sio = io.listen(this.robot.server);
		sio.on("connection", function(socket) {
			that.socket = socket;
			socket.on("disconnect", function() {
				sio.sockets.emit("User disconnected");
			});

			socket.on("message", function(data) {
				console.log(data);
				that.send(data);
			});
		});
	};

	return Websocket;

})(Adapter);


module.exports.use = function(robot) {
	return new Websocket(robot);
};