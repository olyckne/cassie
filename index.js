var robot = require("./src/robot"),
	Adapter = require("./src/adapter"),
	scripts = require("./enabled-scripts.json");

port = 3030;
var r = new robot("websocket", true);

r.loadAdapter();
r.loadScripts("./src/scripts", scripts);

r.adapter.run();