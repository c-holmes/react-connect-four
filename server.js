const express = require('express');
const app = express();
const http = require('http');
const io = require('socket.io');
const server = http.createServer(app);

/* Express server set up. */
app.use(express.static('public'))
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

/* Socket.IO server set up. */
const sio = io.listen(server);
sio.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('submit_move', (msg) => {
    sio.emit('submit_move', msg);
  });

  socket.on('game_won', (msg) => {
    sio.emit('game_won', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
	console.log('Listening on 3000');
})