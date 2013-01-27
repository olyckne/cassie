/**
 * Interface for a chat source
 *
 * @class Adapter
 * @constructor
 *
 */

var Adapter = (function() {

	function Adapter(robot) {
		this.robot = robot;
	}

	Adapter.prototype = {

		/**
		 * Function: send
		 *
		 * Sends a message to client
		 *
		 * Parameters:
		 *
		 *   msg - [type/description]
		 *
		 * Returns:
		 *
		 *   return description
		 */
		send: function(msg) {

		},

		/**
		 * Function: reply
		 *
		 * Replies to client
		 *
		 * Parameters:
		 *
		 *   msg - [type/description]
		 *
		 * Returns:
		 *
		 *   return description
		 */
		reply: function(msg) {

		},

		/**
		 * Function: receive
		 *
		 * Receives a message from client, dispatches it to robot
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
			this.robot.receive(msg);
		},

		/**
		 * Function: run
		 *
		 * starting the bot
		 *
		 * Returns:
		 *
		 *   return description
		 */
		run: function() {

		}


	};

	return Adapter;

})();


module.exports = Adapter;