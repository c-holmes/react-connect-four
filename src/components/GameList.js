import React, { Component } from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';
const io = require('socket.io-client');
const socket = io();
import JoinGameForm from './JoinGameForm';

class GameList extends Component {
	handleSubmit(values, key) {
		// console.log(values, key);
		const gameId = this.props.lobbyData.availableGames[key].id;
		const userId = shortid.generate();

		//reducer
		this.props.addCurrUser(userId, values.userName, 1);

		// this.props.createHostedGame(gameId, values.userName);
		// //socket emit
		socket.emit('lobby_game_joined', {
			id: gameId,
			playerNum: 1,
			player2: values.userName
		});
		//player1 router change
		this.props.router.push(`/play/2-${gameId}`);
	}

	renderGame(key) {
		return(
			<li key={key}>
				<div className="container">
					<span className="game">{this.props.lobbyData.availableGames[key].player1}'s Game</span>
					<JoinGameForm onSubmit={(i) => this.handleSubmit(i, key)}/>
					<span>
						<Link to={`/play/2-${this.props.lobbyData.availableGames[key].id}`}>Join</Link> 
					</span>
				</div>
			</li>
		)
	}

	render() {
		return(
			<ul>
				{Object.keys(this.props.lobbyData.availableGames).map(this.renderGame.bind(this))}
			</ul>
		)
	}
}

export default GameList;