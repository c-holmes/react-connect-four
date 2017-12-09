import React, { Component } from 'react';
import shortid from 'shortid';
const io = require('socket.io-client');
const socket = io();
import CreateGameForm from './CreateGameForm';
import GameList from './GameList';
import AdminBar from './AdminBar';

class Lobby extends Component {
	constructor() {
		super();
		this.state = {
			panelStyle: {
				height: 'auto',
			}
		};
	}

	componentDidMount() {
		socket.on('lobby_game_created', (data) => {
			this.props.hostedGameAvailable(data.id, data.player1);
		});

		//set height to full screen
		if(window.innerWidth > 767){
			let selector = document.getElementsByClassName('lobby')[0];
			let margin = parseInt(window.getComputedStyle(selector, null).getPropertyValue('margin-top'))*2;
			let windowHeight = window.innerHeight - 48 - 53;

			this.setState({
				panelStyle: {
					maxHeight: windowHeight - margin,
				} 
			});
		} 
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

		//update multiplayer state
		this.props.gameStart(gameId, true);

		//player1 router change
		this.props.router.push(`/play/2-${gameId}`);
	}

	render() {
		return(
			<div className="lobby">
				<AdminBar />
				<div className="host">
					<h2>Host a Game</h2>
					<CreateGameForm onSubmit={(i) => this.handleSubmit(i)}/>
				</div>
				<div className="join">
					<h2>Join a Game</h2>
					<div className="overflow-container" style={this.state.panelStyle}>
						<GameList fetchAvailableGames={this.props.fetchAvailableGames} gameStart={this.props.gameStart} joinHostedGame={this.props.joinHostedGame} lobbyData={this.props.lobbyData} addCurrUser={this.props.addCurrUser} router={this.props.router} />
					</div>
				</div>
			</div>
		)
	}
}  

export default Lobby;