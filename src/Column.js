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

function Square(props) {
	return(
		<div className="square">
			<button>{props.pieceIndex}</button>
		</div>
	)
}

export default Column;