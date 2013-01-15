
module.exports = function(robot) {
  robot.respond(/pug me/i, function(msg) {
    return msg.http("http://pugme.herokuapp.com/random").get()(function(err, res, body) {
      return msg.send(JSON.parse(body).pug);
    });
  });
  robot.respond(/pug bomb( (\d+))?/i, function(msg) {
    var count;
    count = msg.match[2] || 5;
    return msg.http("http://pugme.herokuapp.com/bomb?count=" + count).get()(function(err, res, body) {
      var pug, _i, _len, _ref, _results;
      _ref = JSON.parse(body).pugs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pug = _ref[_i];
        _results.push(msg.send(pug));
      }
      return _results;
    });
  });
  return robot.respond(/how many pugs are there/i, function(msg) {
    return msg.http("http://pugme.herokuapp.com/count").get()(function(err, res, body) {
      return msg.send("There are " + (JSON.parse(body).pug_count) + " pugs.");
    });
  });
};
