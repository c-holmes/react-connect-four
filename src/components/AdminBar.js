import React, {Component} from 'react';

class AdminBar extends Component{
	renderOutScoreBoard(multiplayer) {
		const player1Score = this.props.score[this.props.player];
		const player2Score = this.props.score[1 - this.props.player];
		if(multiplayer){
			const player1ClassName = 'player' + this.props.player + ' item';
			const player2ClassName = 'player' + (1 - this.props.player) + ' item';
			return(
				<span>
					<span className={player1ClassName}>You: {player1Score}</span>
					<span className={player2ClassName}>Other Player: {player2Score}</span>
				</span>
			)
		} else {
			return(
				<span>
					<span className="player0 item">Player 1: {player1Score}</span>
					<span className="player1 item">Player 2: {player2Score}</span>
				</span>
			)
		}
	}
	render() {
		return(
			<div className="admin-bar">
				<span className="score">
					{this.renderOutScoreBoard(this.props.multiplayer)}
				</span>
				<span className="item curr-turn">
					Current Turn: <span className={'player-' + this.props.turn}>{(this.props.turn) ? "Red" : "Yellow"}</span>
				</span>
				<span className="item">Game Number: {this.props.gameNum}</span>
			</div>
		)
	}
}

export default AdminBar;