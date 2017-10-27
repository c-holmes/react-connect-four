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
		      <ul className="game-menu">
		        <li><Link to={`/play/1-${gameId}`} className="play" onClick={()=>this.handleClick(`1-${gameId}`, false)} >Single Player</Link></li>
		        <li><Link to={`/play/2-${gameId}`} className="play" onClick={()=>this.handleClick(`2-${gameId}`, true)} >Multiplayer</Link></li>
		        <li><Link to="/play" className="lobby" >Lobby</Link></li>
		        <li><Link to="/test" className="how-to-play">How To Play</Link></li>
		      </ul>
		  </div>
		)
	}
}

export default GameMenu;