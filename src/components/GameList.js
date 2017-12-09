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
		const gameId = this.props.lobbyData.availableGames[key]._id;
		const userId = shortid.generate();

		//reducer
		this.props.addCurrUser(userId, values.userName, 1);

		//socket emit
		socket.emit('lobby_game_joined', {
			_id: gameId,
			playerNum: 1,
			player2: values.userName
		});

		//update lobby state
		this.props.joinHostedGame(gameId, key);

		//update multiplayer state
		this.props.gameStart(gameId, true);

		//player1 router change
		this.props.router.push(`/play/2-${gameId}`);
	}

	renderGame(key) {
		if(this.props.lobbyData.availableGames[key] !== null){
			let today = new Date();
			let date = Date.parse(this.props.lobbyData.availableGames[key].date);
			date = Math.round((today - date) / 60000);
			return(
				<li key={key}>
					<div className="container">
						<span className="game"><span>{this.props.lobbyData.availableGames[key].player1}</span>'s Game</span>
						<JoinGameForm form={`joinGame-${key}`} onSubmit={(i) => this.handleSubmit(i, key)}/>
						<span className="date">Game Created: {date} minutes ago</span>
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
					{Object.keys(this.props.lobbyData.availableGames.reverse()).map(this.renderGame.bind(this))}
				</ul>
			)
		}
	}
}

export default GameList;