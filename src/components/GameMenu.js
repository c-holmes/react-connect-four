import React, { Component } from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';

class GameMenu extends Component {
	constructor(){
		super();
		this.state = {
			panelStyle: {
				height: 'auto'
			}
		};
	}

	handleClick(gameId, multiplayer) {
		this.props.gameStart(gameId, multiplayer);
	}

	componentDidMount() {
		let gameMenu = document.getElementsByClassName('game-menu')[0];
		let gameMenuMargin = parseInt(window.getComputedStyle(gameMenu, null).getPropertyValue('margin-top'));
		this.setState({
			panelStyle:{
				height: window.innerHeight - (48 + (gameMenuMargin*2))
			} 
		});
	}

	render() {
		// console.log(gameMenu);
		// let gameMenuMargin = window.getComputedStyle(gameMenu, null).getPropertyValue('margin');
		// console.log(gameMenuMargin);
		// let autoHeight = {
		// 	// height: window.outerHeight - (48 + gameMenuMargin)
		// }
		// console.log(autoHeight);
		// console.log(gameMenu);
		let gameId = shortid.generate();
		return(
		  <div>
		  		<div className="admin-bar home">
		  			<div className="container">
		  				<img className="sml-logo" src={`${window.location.origin}/connect-four-small.png`} alt="connect-four" />
		  			</div>
		  		</div>
		      <ul className="game-menu">
		        <li>
		        	<Link to="/play" className="lobby panel" style={this.state.panelStyle}>
		        		<span className="top">Online Play</span>
		        		<span className="bottom">Multiplayer</span> 
		        	</Link>
		        </li>
		        <li>
		        	<Link to={`/play/1-${gameId}`} className="play panel" onClick={()=>this.handleClick(`1-${gameId}`, false)} style={this.state.panelStyle} >
			        	<span className="top">Turn Based Play</span>
			        	<span className="bottom">Single Device</span> 
		        	</Link>
		        </li>
		      </ul>
		  </div>
		)
	}
}

export default GameMenu;