import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Game from './Game';
// import GameMenu from './GameMenu';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: 'home-screen',
      multiplayer: false
    }
  }

  ParentClassNameBy(url){
    if(url === '/'){
      return 'home-screen';
    } else {
      return 'misc-screen';
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
              <ul className={this.state.location}>
                <li><Link to="/" className="home">Home</Link></li>
                <li><Link to="/play" className="play">Single Player</Link></li>
                <li><Link to="/lobby" className="lobby">Multiplayer</Link></li>
                <li><Link to="/how-to-play" className="how-to-play">How To Play</Link></li>
              </ul>
              <Route path='/play' component={Game} multiplayer={this.state.multiplayer} />
              <Route path='/lobby' component={Game}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
