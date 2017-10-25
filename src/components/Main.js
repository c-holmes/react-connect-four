import React, { Component } from 'react';
import Game from './Game';
// import GameMenu from './GameMenu';

class Main extends Component {
  render() {
    return (
      <div className="App">
      	{React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;
