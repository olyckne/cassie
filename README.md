# Cassie
--
A nice and friendly chatbot.
Influenced by Githubs [hubot](https://github.com/github/hubot). 
Actually, some scripts for Hubot might work with Cassie.


### Install
--
- Download
- Make sure you have [nodejs](http://nodejs.org) installed.
- run `npm install` in the root of Cassies directory
- `cp enabled-scripts-sample.json enabled-scripts.json`
- `node index.js` to start the server.


### Customize
--
Well, you can customize some stuff by editing `index.js` and setting some parameters etc.

This is gonna be better and easier.

### Client
--
Well, you need a client

- You can use Cassies web client. Available at <https://github.com/olyckne/cassie-webclient>
- Write your own client
    - by communicate with [socket.io](http://socket.io)
    - or write your own adapter on the server (look in src/adapters)

### Scripts
--
Scripts is the cool stuff
For now there only is three in the repo

- itunes - for controlling iTunes (uses osascript so Mac only?)
- system - for checking cassie and server uptime
- tweet - searching twitter for a tweet by keyword

Add your own by:

- creating a .js file in src/scripts
- Write the code 
```javascript
module.exports = function(robot) {

    robot.respond(/regex to respond to/, function(msg) {
       // Do your cool stuff
       msg.send(stuffToSendBack);
    });
};
```
- Add filename to enabled-scripts.json. 
