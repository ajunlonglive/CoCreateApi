'use strict';
var cors = require('cors')
const express = require('express');
const { createServer } = require('http');
const init = require("./init")


const urlencoded = require('body-parser').urlencoded;
const socketServer = require("@cocreate/socket-server")
const wsManager = new socketServer('api');

const app = express();
app.use(cors())
const port = process.env.PORT || 3002;

app.use(urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/api_/hello', (req, res) => {
  console.log('connected')
  res.send('Hello World');
})

// app.use('/api_/twilio', require('./plugins/twilio/routes'));


init.WSManager(wsManager);

const server = createServer(app);

server.on('upgrade', function upgrade(request, socket, head) {
  if (!wsManager.handleUpgrade(request, socket, head)) {
    socket.destroy();
  }
});


server.listen(port, () => {
  console.log('API listening at http://localhost:', port)
});