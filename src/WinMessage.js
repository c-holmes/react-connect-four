import React, {Component} from 'react';

class WinMessage extends Component {
	render() {
		return(
			<div className="winner popup">
				<h2>{(this.props.player) ? "Red" : "Yellow" } is the Winner!</h2>
				<button onClick={(i) => this.props.onClick()}>Reset</button>
			</div>
		)
	}
}

export default WinMessage;