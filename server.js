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
let player = 0;
sio.on('connection', (socket) => {
  socket.join('active-game-room');
  let room = sio.sockets.adapter.rooms['active-game-room'];

  if(room.length > 2){
  	socket.leave('active-game-room');
  	console.log('only 2 allowed in the game room')
  }

  //assign player number
  socket.emit('player_assign', player);
  console.log(`Player ${player} connected`);
  player = 1 - player;

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