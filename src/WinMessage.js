import React, {Component} from 'react';

class WinMessage extends Component {
	render() {
		return(
			<div className={"winner popup player-" + this.props.currTurn}>
				<h2>{(this.props.currTurn) ? "Red" : "Yellow" } is the Winner!</h2>
				<h3>Game was won {this.props.stats.winType + 'ly'}</h3>
				<button onClick={(i) => this.props.onClick()}>Reset</button>
			</div>
		)
	}
}

export default WinMessage;