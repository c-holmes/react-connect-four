import React, { Component } from 'react';
import Square from './Square';

class Column extends Component {
	renderSquare(index) {
		return(
			<Square player={this.props.player} index={index} columnIndex={this.props.columnIndex} status={this.props.columnArray[index]} winStats={this.props.winStats} onClick={(i) => this.props.onClick(i)} />
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
				</div>
			</div>
		)
	}
}

export default Column;