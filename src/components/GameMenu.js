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

	componentDidMount() {
		//set height to full screen
		let selector = document.getElementsByClassName('game-menu')[0];
		let margin = parseInt(window.getComputedStyle(selector, null).getPropertyValue('margin-top'))*2;
		let windowHeight = window.innerHeight - 48;
		if(window.innerWidth < 767){
			windowHeight = (windowHeight / 2);
			margin = margin - 33;
		} 
		this.setState({
			panelStyle:{
				height: windowHeight - margin
			} 
		});
	}

	render() {
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
		        	<Link to="/lobby" className="lobby panel" style={this.state.panelStyle}>
		        		<div className="container">
			        		<span className="top">Online Play</span>
			        		<span className="bottom">Multiplayer</span> 
			        	</div>
		        	</Link>
		        </li>
		        <li>
		        	<Link to='/play' className="play panel" style={this.state.panelStyle} >
			        	<div className="container">
				        	<span className="top">Turn Based Play</span>
				        	<span className="bottom">Single Device</span> 
				        </div>
		        	</Link>
		        </li>
		      </ul>
		  </div>
		)
	}
}

export default GameMenu;