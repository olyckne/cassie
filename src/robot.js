var Path = require("path"),
	Http = require("http");

 /**
 * Robot
 * 
 * @class Robot
 * @constructor
 * 
 */

var Robot = (function() {

	function Robot(adapter, server, name) {
		this.adapter = adapter || "websocket";
		if(server) this.setupServer();

		this.name = name || "Cassie";
	}

	Robot.prototype = {
	
		/**
		 * Function: receive
		 * 
		 * Receives message, passes to listeners
		 * 
		 * Parameters:
		 * 
		 *   msg - [type/description]
		 * 
		 * Returns:
		 * 
		 *   return description
		 */
		receive: function(msg) {
			this.response(msg);
		},

		response: function(msg) {
			this.adapter.send("Received: "+msg);
		},

		loadScripts: function(path, scripts) {
			for(var script in scripts) {
				try {
					require(Path.join(path, script));
				} catch(e) {
					console.log(e);
				}
			}
		},
		
		loadAdapter: function() {
			try {
				this.adapter = require("./adapters/"+this.adapter).use(this);
			} catch(e) {
				console.log(e);
			}
		},

		setupServer: function() {
			this.server = Http.createServer( function(req, res) {
				res.writeHead(200);
				return res.end("Cassie");
			});

			this.server.listen(port || 8080);
		}
	};	

	return Robot;

})();


module.exports = Robot;