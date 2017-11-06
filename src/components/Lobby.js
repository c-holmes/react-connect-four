import React, { Component } from 'react';
import shortid from 'shortid';
const io = require('socket.io-client');
const socket = io();
import CreateGameForm from './CreateGameForm';
import GameList from './GameList';

class Lobby extends Component {
	componentDidMount() {
		socket.on('lobby_game_created', (data) => {
			this.props.hostedGameAvailable(data.id, data.player1);
		});
	}

	handleSubmit(values){
		let gameId = shortid.generate();
		//reducer
		this.props.createHostedGame(gameId, values.userName);
		//socket emit
		socket.emit('lobby_game_created', {
			id: gameId,
			player1: values.userName
		});
		//player1 router change
		this.props.router.push(`/play/2-${gameId}`);
	}

	render() {
		return(
			<div className="lobby">
				<div className="host">
					<h2>Host a Game</h2>
					<CreateGameForm onSubmit={(i) => this.handleSubmit(i)}/>
				</div>
				<div className="join">
					<h2>Join a Game</h2>
					{console.log(this.props)}
					<GameList lobbyData={this.props.lobbyData} />
				</div>
			</div>
		)
	}
}  

export default Lobby;