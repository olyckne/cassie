var robot = require("./src/robot"),
	Adapter = require("./src/adapter")
	;

port = 3030;
var r = new robot("websocket", true);

r.loadAdapter();

console.log(r);
console.log(r.adapter.run());