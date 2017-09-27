import React, {Component} from 'react';

class WinMessage extends Component {
	render() {
		console.log(this.props.stats);
		return(
			<div className={"winner popup player-" + this.props.player}>
				<h2>{(this.props.player) ? "Red" : "Yellow" } is the Winner!</h2>
				<h3>Game was won {this.props.stats.winType + 'ly'}</h3>
				<button onClick={(i) => this.props.onClick()}>Reset</button>
			</div>
		)
	}
}

export default WinMessage;