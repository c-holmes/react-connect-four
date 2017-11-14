const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const io = require('socket.io');
const webpack = require('webpack');
const config = require('./webpack.dev');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
    sio.emit('player_assign', data);
    console.log(`Game ${data.id} Player ${data.playerNum} connected`);
  });

  socket.on('lobby_game_joined', (data) => {
    //assign player number
    sio.emit('player_assign', data);
    console.log(`Game ${data.id} Player ${data.playerNum} connected`);
  })

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

/* Mongoose Setup */
const hostedGame = require('./src/models/hostedGame');
mongoose.connect('mongodb://localhost/connect-four');

/* Express - Routes */
app.use('/', express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route('/games')
  .get((req, res) => {
    hostedGame.find((err, games) => {
      if (err) {
        return res.send(err);
      }

      return res.json(games);
    });
  })
  .post((req, res) => {
    const game = new hostedGame(req.body);

    console.log(game);

    game.save((err) => {
      if (err) {
        return res.send(err);
      }

      return res.json({ game: 'Game Created'});
    })
  });

// all of our routes will be prefixed with /api
app.use('/api', router);

/* Express server set up. */
// use * to always serve the index file (needed for react router)
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => {
	console.log('Listening on 3000');
})