import React, { Component } from 'react';
import Column from './Column';

class Grid extends Component {
	renderColumn(index) {
		return(
			<Column player={this.props.player} columnArray={this.props.game[index]} columnIndex={index} winStats={this.props.winStats} onClick={(i) => this.props.onClick(i)} />
		)
	}

	render() {
		return(
			<div className="grid">
				{this.renderColumn(0)}
				{this.renderColumn(1)}
				{this.renderColumn(2)}
				{this.renderColumn(3)}
				{this.renderColumn(4)}
				{this.renderColumn(5)}
				{this.renderColumn(6)}
			</div>
		)
	}
}

export default Grid;