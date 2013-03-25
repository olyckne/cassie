var robot = require("./src/robot"),
	Adapter = require("./src/adapter"),
	scripts = require("./enabled-scripts.json"),
	config = require("./config.json");


console.log(config);
var r = new robot(config);

r.loadAdapter();
r.loadScripts("./src/scripts", scripts);

r.adapter.run();