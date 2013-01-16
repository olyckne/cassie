var exec = require("child_process").exec;

module.exports = function(robot) {
	robot.respond(/i(t|T)unes (playpause|play|pause)$/i, function(msg) {
		var cmd = msg.match[2] || "playpause";
		console.log(msg.match[2]);
		new iTunes().execute(cmd, function() {
			robot.receive("itunes status");
		});
	});

	robot.respond(/i(t|T)unes what is playing(\?)?/, function(msg) {
		new iTunes().execute("artist of current track & \" - \" & name of current track & \" (\" & album of current track & \")\"", function(data) {
			if(data === "") data = "Nothing's playing...";
			msg.send(data);
		});
	});

	robot.respond(/i(t|T)unes next/, function(msg) {
		new iTunes().execute("next track", function(data) {
			robot.receive("itunes what is playing");
		});
	});

	robot.respond(/i(t|T)unes prev(ious)?/, function(msg) {
		new iTunes().execute("previous track", function(data) {
			robot.receive("itunes what is playing");
		});
	});

	robot.respond(/i(t|T)unes status/, function(msg) {
		new iTunes().execute("player state as string", function(data) {
			msg.send(data);
			robot.receive("itunes what is playing");
		});
	});


	robot.respond(/i(t|T)unes volume( (\d+))?/i, function(msg) {
		var count = msg.match[3] || false;
		if(count) {
			new iTunes().execute("set sound volume to " + count, function(data) {
				robot.receive("itunes volume");
			});
		}
		else {
			new iTunes().execute("sound volume as integer", function(data) {
				msg.send(data);
			});
		}
	});

	robot.respond(/i(t|T)unes start/, function(msg) {
		msg.send("Starting iTunes...");
		new iTunes().execute("osascript -e 'launch application \"iTunes\"'", function(msg) {
			robot.receive("itunes status");
		});
	});

	robot.respond(/i(t|T)unes quit/, function(msg) {
		msg.send("Quitting iTunes...");
		new iTunes().execute("quit");
	});

	robot.respond(/i(t|T)unes rate( (\d+))?/i, function(msg) {
		var count = msg.match[3] || false;
		if(count) {
			count=count*20;	
			new iTunes().execute("set rating of current track to "+count, function(msg) {
				robot.receive("itunes rate");
			});
		} else {
			new iTunes().execute("rating of current track as integer", function(data) {
				msg.send("Rating: "+data/20);
			});
		}
	});

	robot.respond(/i(t|T)unes playlist( (\w+))?/i, function(msg) {
		var cmd = msg.match[3] || false;

		if(cmd) {
			new iTunes().execute("play playlist \""+cmd+"\"", function(data) {
				msg.send(data);
			});
		} else {
			new iTunes().execute("set allPlaylists to (get name of every playlist)", function(data) {
				msg.send(data);
			});
		}
	});

	robot.respond(/i(t|T)unes search( (\w+))?/i, function(msg) {
		var search = msg.match[3] || false,
			cmd;
		if(search) {
			cmd = "set searchResult to search library playlist 1 for \""+search+"\"' ";
			cmd += "-e 'set cassie_playlist to \"Cassie_script\" as string \n ";
			cmd += "if cassie_playlist exists then \n try \n delete tracks of user playlist cassie_playlist \n end try\n ";
			cmd += "else \n make new user playlist with properties {name: cassie_playlist} \n end if";
			// cmd += "repeat with aTrack in searchResult \n duplicate aTrack to end of playlist cassie_playlist \n end repeat \n";
			// cmd += "play playlist cassie_playlist";
			new iTunes().execute(cmd, function(data) {
				msg.send(data);
			});
		} else {
			msg.send("You need to enter search query");
		}
	});

};

function iTunes() {
	this.cmd = "osascript -e 'tell application \"iTunes\" to ";
}

iTunes.prototype = {
	execute: function(cmd, callback, rawCmd) {
		callback = callback || function(){};
		if(!rawCmd)	cmd = this.cmd+cmd+"'";
		console.log(cmd);
		exec(cmd, function(error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			}

			callback.call(this, stdout);
		});
	}
};