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