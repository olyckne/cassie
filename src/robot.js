var Path = require("path"),
	Http = require("http"),
	HttpClient = require("scoped-http-client"),
	Response = require("./response"),
	Listener = require("./listener");

 /**
 * Robot
 *
 * @class Robot
 * @constructor
 *
 */

var Robot = (function() {

	function Robot(adapter, server, name) {
		this.adapter = adapter || "websocket-io";
		if(server) this.setupServer();

		this.Response = Response;
		this.listeners = [];
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
			for(var i = 0; i < this.listeners.length; i++) {
				this.listeners[i].call(msg);
			}
		},

		respond: function(regex, callback) {
			console.log(regex);
			this.listeners.push(new Listener(this, regex, callback));
		},

		loadScripts: function(path, scripts) {
			path = Path.resolve(path);
			var i, ext, full, _this = this;
			for(i = 0; i < scripts.length; i++) {
				ext = Path.extname(scripts[i]);
				full = Path.join(path, scripts[i]);
				if(ext === ".coffee" || ext === ".js") {
					try {
						require(full)(this);

					} catch(e) {
						console.log("Can not load " + full + ": " + e);
					}
				}
			}
			this.respond(/help/, function(msg) {
				for(var i = 0; i < _this.listeners.length; i++)
					msg.send(_this.listeners[i].regex);
			});

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
		},

		http: function(url) {
			return HttpClient.create(url);
		}
	};

	return Robot;

})();


module.exports = Robot;