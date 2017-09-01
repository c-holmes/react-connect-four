import React, { Component } from 'react';
import Square from './Square';

class Column extends Component {
	constructor() {
		super();
		this.state = {
			status: 'inactive',
		}
	}

	renderSquare(index) {
		return(
			<Square onClick={(i) => this.props.onClick(i)} player={this.props.player} index={index} columnIndex={this.props.columnIndex} />
		)
	}

	render() {
		return(
			<div className="column">
				<div className="heading">{this.props.columnIndex}</div>
				<div className="squares">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
					{this.renderSquare(6)}
				</div>
			</div>
		)
	}
}

export default Column;