import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Game from './Game';


class GameMenu extends Component {
	render() {
		return(
			<div className="game-menu">
				<Router>
				  <div>
				      <ul className="game-menu">
				        <li><Link to="/" className="home" >Home</Link></li>
				        <li><Link to="/play" className="play" >Single Player</Link></li>
				        <li><Link to="/lobby" className="lobby" >Multiplayer</Link></li>
				        <li><Link to="/how-to-play" className="how-to-play">How To Play</Link></li>
				      </ul>
				      <Route path='/play' component={Game} />
				      <Route path='/lobby' component={Game}/>
				  </div>
				</Router>
			</div>
		)
	}
}

export default GameMenu;