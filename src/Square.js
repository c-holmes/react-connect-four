import React, { Component } from 'react';

class Square extends Component {
	constructor() {
		super();
		this.state = {
			status: 'inactive'
		}
	}

	handleClick() {
		const clicked = 'active ' + 'player' + this.props.player;
		this.setState({
			status: clicked 
		})
	}

	render() {
		return(
			<div className="square">
				<button className={this.state.status} onClick={() => {this.props.onClick(this.props); this.handleClick();}}> {this.props.index}</button>
			</div>
		)
	}
}

export default Square;