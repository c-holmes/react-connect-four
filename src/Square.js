import React, { Component } from 'react';

class Square extends Component {
	determineStatus(status) {
		if(status === 0) {
			return "active player-0";
		} else if(status === 1) {
			return "active player-1";
		}
		return;
	}

	render() {
		return(
			<div className="square">
				<button className={this.determineStatus(this.props.status)} onClick={() => {this.props.onClick(this.props)}}> {this.props.index}</button>
			</div>
		)
	}
}

export default Square;