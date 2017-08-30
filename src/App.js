import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  isGameFinished(gameArray, player){
    const winNum = 4;
    let currNum = 0;
    let winner = false;
    let vertPiecesArray = [null,null,null,null,null,null];
    let horsPiecesArray = [null,null,null,null,null,null,null];

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
      } else {
        console.log('game is not over')
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
      } else {
        console.log('game is not over')
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
        }
      }
    }
  }

  render() {
    const currentPlayer = 1;
    const gameArray = [
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, null, null],
      [0, 0, null, null, null, null],
      [1, 0, null, null, null, null],
      [1, 1, null, null, null, null],
      [0, 1, null, null, null, null],
      [1, 1, null, null, null, null],
    ];
    return (
      <div className="App">
        <button onClick={this.isGameFinished(gameArray, currentPlayer)}>Submit Move</button>
      </div>
    );
  }
}

export default App;
