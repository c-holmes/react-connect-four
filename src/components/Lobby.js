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
		const gameId = shortid.generate();
		const userId = shortid.generate();
		
		//reducers
		this.props.createHostedGame(gameId, values.userName);
		this.props.addCurrUser(userId, values.userName, 0);

		//socket emit
		socket.emit('lobby_game_created', {
			id: gameId,
			playerNum: 0,
			player1: values.userName,
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
					<GameList lobbyData={this.props.lobbyData} addCurrUser={this.props.addCurrUser} router={this.props.router} />
				</div>
			</div>
		)
	}
}  

export default Lobby;