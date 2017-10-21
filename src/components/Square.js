import React, { Component } from 'react';

class Square extends Component {
	determineStatus(status, columnIndex, index, winStats) {
		let className = "";

		//check click status
		if(status === 0) {
			className += "active player-0";
		} else if(status === 1) {
			className += "active player-1";
		}

		//check win status
		if(winStats){
			winStats.winArray.forEach((i) => {
				if(i[0] === columnIndex && i[1] === index) {
					className += " winning-square";
				}
			});
		} else {
			className += " standard";
		}
		return className;
	}

	render() {
		return(
			<div className="square">
				<button className={this.determineStatus(this.props.status, this.props.columnIndex, this.props.index, this.props.winStats)} onClick={() => {this.props.onClick(this.props)}}> {this.props.index}</button>
			</div>
		)
	}
}

export default Square;