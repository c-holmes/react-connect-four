import React, { Component } from 'react';
import Grid from './Grid';
import WinMessage from './WinMessage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: [ 
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      player: 0,
      clicked: false,
      winner: false,
    }
  }

  handleSubmitMove() {
    const gameStatus = this.state.game.slice();
    let currPlayer = this.state.player;
    if(this.isGameFinished(gameStatus, currPlayer)){
      this.setState({
        winner: true,
      })
      console.log('There is a Winner');
    } else {
      currPlayer = 1 - currPlayer;
      this.setState({
        player: currPlayer,
        clicked: false,
      })
      console.log('Next Move');
    }
  }

  handleSquareClick(props) {
    if(!this.state.clicked){
      const newGameStatus = this.state.game.slice();
      const length = newGameStatus[props.columnIndex].length - 1;
      let index;

      //to account for pieces to obey gravity and stack from the bottom up
      for (let [i, value] of newGameStatus[props.columnIndex].entries()){
        if(value !== null){
          index = i - 1;
          break;
        } else if( i === length){
          index =  i;
          break;
        }
      }

      newGameStatus[props.columnIndex][index] = props.player;
      this.setState({
        game: newGameStatus,
        clicked: true,
      })
    }
  }

  handleReset() {
    this.setState({
      game: [ 
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      player: 0,
      clicked: false,
      winner: false,
    })
  }
  
  render() {
    let winComponent = "";
    if(this.state.winner){
      winComponent = <WinMessage player={this.state.player} onClick={(i) => this.handleReset(i)} />;
    }
    return (
      <div className="App">
        <Grid player={this.state.player} onClick={(i) => this.handleSquareClick(i)} game={this.state.game} />
        <h4>Current Turn: {(this.state.player) ? "Red" : "Yellow"}</h4>
        <button className="submit" onClick={() => this.handleSubmitMove()} >Submit Move</button>
        {winComponent}
      </div>
    );
  }

  isGameFinished(gameArray, player){
    const winNum = 4;
    let currNum = 0;
    let winner = false;
    let vertPiecesArray = [null,null,null,null,null,null,null];
    let horsPiecesArray = [null,null,null,null,null,null,null,null];
    let ttbDiagPiecesArray = [null,null,null,null,null,null,null];
    let bttDiagPiecesArray = [null,null,null,null,null,null,null];

    function checkForVerticalWin(pieceValue, pieceIndex, columnIndex, player) {
      //count consecutive pieces
      if (pieceValue !== null && pieceValue === player) {
        vertPiecesArray[columnIndex]++;
      } else {
        vertPiecesArray[columnIndex] = null;
      }

      //check if theres a winner
      if (vertPiecesArray[columnIndex] === winNum) {
        winner = true;
        console.log('game is won Vertically');
      } 
    }

    function checkForHorizontalWin(pieceValue, pieceIndex, columnIndex, player) {
      if ( pieceValue !== null && pieceValue === player) {
        horsPiecesArray[pieceIndex]++;
      } else {
        horsPiecesArray[pieceIndex] = null;
      }

      //check if theres a winner
      if (horsPiecesArray[pieceIndex] === winNum) {
        winner = true;
        console.log('game is won Horizontally');
      }
    }

    function checkForDiagonalWin(pieceValue, pieceIndex, columnIndex, player) {
      // a diagonal win can either come from bottom to top (btt) or top to bottom (ttb)
      // To group squares into their appropriate diagonals array, we must subtract the piece index and column index, to get a common number
      // 3 is added to keep numbers positive, so they map to the correct array index
      let ttbDiagGroupIndex = pieceIndex - columnIndex + 3;
      let bttDiagGroupIndex = pieceIndex + columnIndex - 3;

      if (pieceValue !== null && pieceValue === player) {
        // we are only checking the 5 diagonal groups that have a total of 4 or more pieces 
        if(ttbDiagGroupIndex <= 5 && ttbDiagGroupIndex > 0){
          ttbDiagPiecesArray[ttbDiagGroupIndex]++;                   
        }
        if (bttDiagGroupIndex <= 5 && bttDiagGroupIndex > 0) {
          bttDiagPiecesArray[bttDiagGroupIndex]++;
        }
      } else {
        // reset array to 0 (null) 
        if(ttbDiagGroupIndex <= 5 && ttbDiagGroupIndex > 0){
          ttbDiagPiecesArray[ttbDiagGroupIndex] = null;                   
        } 
        if (bttDiagGroupIndex <= 5 && bttDiagGroupIndex > 0) {
          bttDiagPiecesArray[bttDiagGroupIndex] = null;
        }
      }

      //check if theres a winner
      if (ttbDiagPiecesArray[ttbDiagGroupIndex] === winNum || bttDiagPiecesArray[bttDiagGroupIndex] === winNum) {
        winner = true;
        console.log('game is won Diagonally');
      }
    }

    //ways to win 4 in a row
    for (const [columnIndex, column] of gameArray.entries()) {
      if (!winner) {
        for (const [pieceIndex, pieceValue] of column.entries()) {        
          checkForVerticalWin(pieceValue, pieceIndex, columnIndex, player);
          if (winner) break;
          
          checkForHorizontalWin(pieceValue, pieceIndex, columnIndex, player);
          if (winner) break;

          checkForDiagonalWin(pieceValue, pieceIndex, columnIndex, player);
          if (winner) break;
        }
      }
    }

    return winner;
  }
}

export default App;
