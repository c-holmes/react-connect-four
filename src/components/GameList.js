import React, { Component } from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';
const io = require('socket.io-client');
const socket = io();
import JoinGameForm from './JoinGameForm';

class GameList extends Component {
	componentWillMount() {
		this.props.fetchAvailableGames();
	}

	handleSubmit(values, key) {
		// console.log(values, key);
		const gameId = this.props.lobbyData.availableGames[key]._id;
		const userId = shortid.generate();

		//reducer
		this.props.addCurrUser(userId, values.userName, 1);

		// this.props.createHostedGame(gameId, values.userName);
		// //socket emit
		socket.emit('lobby_game_joined', {
			_id: gameId,
			playerNum: 1,
			player2: values.userName
		});

		this.props.joinHostedGame(gameId, key);

		//player1 router change
		this.props.router.push(`/play/2-${gameId}`);
	}

	renderGame(key) {
		if(this.props.lobbyData.availableGames[key] !== null){
			return(
				<li key={key}>
					<div className="container">
						<span className="game">{this.props.lobbyData.availableGames[key].player1}'s Game</span>
						<JoinGameForm form={`joinGame-${key}`} onSubmit={(i) => this.handleSubmit(i, key)}/>
					</div>
				</li>
			)
		}
	}

	render() {
		if(this.props.lobbyData.availableGames.length == 0){
			return(
				<div className="no-games-msg">
					<i className="icon-sad2"></i>
					<p className="main">Sorry, Currently there are no Hosted Games.</p>
					<p>Why not host one yourself?</p>
				</div>
			)
		} else {
			return(
				<ul>
					{Object.keys(this.props.lobbyData.availableGames).map(this.renderGame.bind(this))}
				</ul>
			)
		}
	}
}

export default GameList;