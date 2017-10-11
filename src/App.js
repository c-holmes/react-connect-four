import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Game from './Game';
import GameMenu from './GameMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={GameMenu}/>
          <Route path='/play' component={Game}/>
          <Route path='/lobby' component={Game}/>
        </Switch>
      </div>
    );
  }
}

export default App;
