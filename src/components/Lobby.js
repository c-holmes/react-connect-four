import React, { Component } from 'react';
import CreateUser from './CreateUser';
import CreateGame from './CreateGame';
import GameList from './GameList';

class Lobby extends Component {
	render() {
		return(
			<div className="lobby">
				<div className="user">
					<h2>Create Temporary User</h2>
					<CreateUser />
				</div>
				<div className="host">
					<h2>Host a Game</h2>
					<CreateGame />
				</div>
				<div className="join">
					<h2>Join a Game</h2>
					<GameList />
				</div>
			</div>
		)
	}
}  

export default Lobby;