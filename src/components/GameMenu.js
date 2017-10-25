import React, { Component } from 'react';
import { Link } from 'react-router';

class GameMenu extends Component {
	render() {
		return(
		  <div>
		      <ul className="game-menu">
		        <li><Link to="/" className="home" >Home</Link></li>
		        <li><Link to="/play" className="play" >Single Player</Link></li>
		        <li><Link to="/lobby" className="lobby" >Multiplayer</Link></li>
		        <li><Link to="/test" className="how-to-play">How To Play</Link></li>
		      </ul>
		  </div>
		)
	}
}

export default GameMenu;