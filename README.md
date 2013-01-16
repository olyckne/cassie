# Cassie

A nice and friendly chatbot.
Influenced by Githubs [hubot](https://github.com/github/hubot)

Actually, some scripts for Hubot might work with Cassie.


### Install

Download
Make sure you have [nodejs](http://nodejs.org) installed.

run `npm install` in the root of Cassies directory

`node index.js` to start the server.

If you want to customize stuff you can edit index.js and set some parameters. 
This is gonna be better and easier.

### Client
Well, you need a client

- You can use Cassies web client.
- Write your own client
    - by communicate with [socket.io](http://socket.io)
    - or write your own adapter on the server (look in src/adapters)

### Scripts
Scripts is the cool stuff
For now there only is two in the repo

- itunes - for controlling iTunes (uses osascript so Mac only?)
- tweet - searching twitter for a tweet

Add your own by:

- creating a .js file in src/scripts
- Write the code (look at one of the existing to get the idea)
- Add filename to enabled-scripts.json. 
