import React, { Component } from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';

class GameMenu extends Component {
	handleClick(gameId, multiplayer) {
		this.props.gameStart(gameId, multiplayer);
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
		        	<Link to="/play" className="lobby">
		        		<span className="top">Online Play</span>
		        		<span className="bottom">Multiplayer</span> 
		        	</Link>
		        </li>
		        <li>
		        	<Link to={`/play/1-${gameId}`} className="play" onClick={()=>this.handleClick(`1-${gameId}`, false)} >
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