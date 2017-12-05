import React, {Component} from 'react';

class GameAdminBar extends Component{
	renderOutScoreBoard(multiplayer) {
		if(multiplayer){
			const player1Score = this.props.score[this.props.player];
			const player2Score = this.props.score[1 - this.props.player];
			const player1ClassName = 'player' + this.props.player + ' item';
			const player2ClassName = 'player' + (1 - this.props.player) + ' item';
			return(
				<span>
					<span className={player1ClassName}>You: {player1Score}</span>
					<span className={player2ClassName}>Other Player: {player2Score}</span>
				</span>
			)
		} else {
			const player1Score = this.props.score[0];
			const player2Score = this.props.score[1];
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
			<div className="admin-bar in-game">
				<div className="container">
					<span className="score">
						{this.renderOutScoreBoard(this.props.multiplayer)}
					</span>&nbsp;
					<span className="item curr-turn"> 
						Current Turn: <span className={'player-' + this.props.turn}>{(this.props.turn) ? "Red" : "Yellow"}</span>
					</span>&nbsp;
					<span className="item">Game Number: {this.props.gameNum}</span>&nbsp;
				</div>
			</div>
		)
	}
}

export default GameAdminBar;