const express = require('express');
const app = express();
const http = require('http');
const io = require('socket.io');
const webpack = require('webpack');
const config = require('./webpack.dev');
const server = http.createServer(app);
const compiler = webpack(config);

/* Socket.IO server set up. */
const sio = io.listen(server);
let player = 0;

sio.on('connection', (socket) => {

  socket.join('active-game-room');
  let room = sio.sockets.adapter.rooms['active-game-room'];
  // console.log(socket);
  if(room.length > 2){
  	socket.leave('active-game-room');
  	console.log('only 2 allowed in the game room')
  }

  socket.on('player_submit_move', (data) => {
    sio.emit('player_submit_move', data);
  });

  socket.on('player_game_over_msg', (data) => {
    sio.emit('player_game_over_msg', data);
  });

  socket.on('game_reset', (data) => {
    sio.emit('game_reset', data);
  });

  socket.on('lobby_game_created', (data) => {
    sio.emit('lobby_game_created', data);
    //assign player number
    socket.emit('player_assign', player);
    console.log(`Player ${player} connected`);
    player = 1 - player;
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

/* Webpack Setup */
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

/* Express server set up. */
// use * to always serve the index file (needed for react router)
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => {
	console.log('Listening on 3000');
})