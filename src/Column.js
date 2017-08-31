import React, { Component } from 'react';

class Column extends Component {
	renderSquare(i) {
		return(
			<Square pieceValue="" pieceIndex={i} columnIndex="" />
		)
	}

	render() {
		return(
			<div className="column">
				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
				{this.renderSquare(3)}
				{this.renderSquare(4)}
				{this.renderSquare(5)}
				{this.renderSquare(6)}
			</div>
		)
	}
}

function Square(props) {
	return(
		<button>Square</button>
	)
}

export default Column;