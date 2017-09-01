import React, { Component } from 'react';
import Grid from './Grid';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: [ 
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      player: 0,
    }
  }

  handleSubmitMove() {
    const gameStatus = this.state.game.slice();
    let currPlayer = this.state.player;
    if(this.isGameFinished(gameStatus, currPlayer)){
      console.log('There is a Winner');
    } else {
      currPlayer = 1 - currPlayer;
      this.setState({
        player: currPlayer,
      })
      console.log('Next Move');
    }
  }

  handleSquareClick(props) {
    const newGameStatus = this.state.game.slice();
    newGameStatus[props.columnIndex][props.index] = props.player;
    this.setState({
      game: newGameStatus
    })
    console.log(props);
  }
  
  render() {
    return (
      <div className="App">
        <Grid player={this.state.player} onClick={(i) => this.handleSquareClick(i)} />
        <h4>Current Turn: {(this.state.player) ? "Red" : "Yellow"}</h4>
        <button className="submit" onClick={() => this.handleSubmitMove()} >Submit Move</button>
      </div>
    );
  }

  isGameFinished(gameArray, player){
    const winNum = 4;
    let currNum = 0;
    let winner = false;
    let vertPiecesArray = [null,null,null,null,null,null];
    let horsPiecesArray = [null,null,null,null,null,null,null];
    let ltrDiagPiecesArray = [null,null,null,null,null,null];
    let rtlDiagPiecesArray = [null,null,null,null,null,null];

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
      // in order to group diagonals together, we must subtract the piece index and column index, to get a common number
      // 3 is added to keep numbers positive, so they map to the correct array index
      let ltrDiagGroupIndex = pieceIndex - columnIndex + 3;
      let rtlDiagGroupIndex = pieceIndex - columnIndex - 3;

      if (pieceValue !== null && pieceValue === player) {
        // we are only checking the 5 diagonal groups that have a total of 4 or more pieces 
        if(ltrDiagGroupIndex <= 5 && ltrDiagGroupIndex > 0){
          ltrDiagPiecesArray[ltrDiagGroupIndex]++;                   
        } else if (rtlDiagGroupIndex <= 5 && rtlDiagGroupIndex > 0) {
          rtlDiagPiecesArray[rtlDiagGroupIndex]++;
        }
      } else {
        if(ltrDiagGroupIndex <= 5 && ltrDiagGroupIndex > 0){
          ltrDiagPiecesArray[ltrDiagGroupIndex] = null;                   
        } else if (rtlDiagGroupIndex <= 5 && rtlDiagGroupIndex > 0) {
          rtlDiagPiecesArray[rtlDiagGroupIndex] = null;
        }
      }

      //check if theres a winner
      if (ltrDiagPiecesArray[ltrDiagGroupIndex] === winNum || rtlDiagPiecesArray[rtlDiagGroupIndex] === winNum) {
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
