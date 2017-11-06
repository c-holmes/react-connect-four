import React, { Component } from 'react';
import { Link } from 'react-router';

class GameList extends Component {
	renderGame(key) {
		return(
			<li key={key}>
				<div className="container">
					<span className="game">{this.props.lobbyData.availableGames[key].player1}'s Game</span>
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