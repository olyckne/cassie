var Message = (function() {
	function Message(msg, done) {
		this.msg = msg || "";
		this.done = done || false;
	}



	return Message;

})();

module.exports = Message;