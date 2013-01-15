var Message = (function() {
	function Message(msg, done) {
		this.msg = msg || "";
		this.done = done || false;
	}

	Message.prototype = {

		match: function(regex) {
			return this.msg.match(regex);
		}
	};


	return Message;

})();

module.exports = Message;