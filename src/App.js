import React, { Component } from 'react';
import Grid from './Grid';
import WinMessage from './WinMessage';
require('./styles/style.scss');

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
        [null, null, null, null, null, null],
      ],
      player: 0,
      clicked: false,
      winner: false,
      winStats: false,
    }
  }

  handleSubmitMove() {
    const gameStatus = this.state.game.slice();
    let currPlayer = this.state.player;
    let gameDone = this.isGameFinished(gameStatus, currPlayer);
    if(gameDone){
      this.setState({
        winner: true,
        winStats: gameDone
      })
    } else {
      currPlayer = 1 - currPlayer;
      this.setState({
        player: currPlayer,
        clicked: false,
      })
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
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      player: 0,
      clicked: false,
      winner: false,
      winStats: false,
    })
  }
  
  render() {
    let winMessage;
    if(this.state.winner){
      winMessage = <WinMessage stats={this.state.winStats} player={this.state.player} onClick={(i) => this.handleReset(i)} />;
    } 
    return (
      <div className="App">
        <div className="admin-prompt">
          <h4>Current Turn: {(this.state.player) ? "Red" : "Yellow"}</h4>
          <button className="submit" onClick={() => this.handleSubmitMove()} >Submit Move</button>
          {winMessage}
        </div>
        <div className="board">
          <div className="leg left"><div className="base"><div className="corner"></div></div></div>
          <Grid player={this.state.player} onClick={(i) => this.handleSquareClick(i)} game={this.state.game} winStats={this.state.winStats} />
          <div className="leg right"><div className="base"><div className="corner"></div></div></div>
        </div>
      </div>
    );
  }

  isGameFinished(gameArray, player){
    const winNum = 4;
    let winner = false;
    let vertPiecesArray = [null,null,null,null,null,null];
    let vertWinArray = [[],[]];
    let horsPiecesArray = [null,null,null,null,null,null,null];
    let horsWinArray = [[],[]];
    let ttbDiagPiecesArray = [null,null,null,null,null,null];
    let ttbDiagWinArray = [[],[]];
    let bttDiagPiecesArray = [null,null,null,null,null,null];
    let bttDiagWinArray = [[],[]];

    function checkForVerticalWin(pieceValue, pieceIndex, columnIndex, player) {
      //count consecutive pieces
      if (pieceValue !== null && pieceValue === player) {
        vertPiecesArray[columnIndex]++;
        vertWinArray[player].push([columnIndex,pieceIndex]);
      } else {
        vertPiecesArray[columnIndex] = null;
      }

      //check if theres a winner
      if (vertPiecesArray[columnIndex] === winNum) {
        //only return the winning indexes
        const winArray = vertWinArray[player].filter((i) => {
          if(i[0] === columnIndex){
            return i;
          }
          return;
        });
        winner =  {
          winType: 'vertical',
          winArray: winArray
        };
      } 
    }

    function checkForHorizontalWin(pieceValue, pieceIndex, columnIndex, player) {
      if ( pieceValue !== null && pieceValue === player) {
        horsPiecesArray[pieceIndex]++;
        horsWinArray[player].push([columnIndex,pieceIndex]);
      } else {
        horsPiecesArray[pieceIndex] = null;
      }

      //check if theres a winner
      if (horsPiecesArray[pieceIndex] === winNum) {
        const winArray = horsWinArray[player].filter((i) => {
          if(i[1] === pieceIndex){
            return i;
          }
          return;
        })
        winner =  {
          winType: 'horizontal',
          winArray: winArray
        };
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
        if(ttbDiagGroupIndex <= 6 && ttbDiagGroupIndex >= 0){
          ttbDiagPiecesArray[ttbDiagGroupIndex]++;
          ttbDiagWinArray[player].push([columnIndex,pieceIndex]);                
        }
        if (bttDiagGroupIndex <= 5 && bttDiagGroupIndex >= 0) {
          bttDiagPiecesArray[bttDiagGroupIndex]++;
          bttDiagWinArray[player].push([columnIndex,pieceIndex]);
        }
      } else {
        // reset array to 0 (null) 
        if(ttbDiagGroupIndex <= 6 && ttbDiagGroupIndex > 0){
          ttbDiagPiecesArray[ttbDiagGroupIndex] = null;                   
        } 
        if (bttDiagGroupIndex <= 5 && bttDiagGroupIndex > 0) {
          bttDiagPiecesArray[bttDiagGroupIndex] = null;
        }
      }

      //check if theres a winner
      if (ttbDiagPiecesArray[ttbDiagGroupIndex] === winNum || bttDiagPiecesArray[bttDiagGroupIndex] === winNum) {
        let winArray;
        if (ttbDiagPiecesArray[ttbDiagGroupIndex] === winNum) {
          winArray = ttbDiagWinArray[player].filter((i) => {
            if((i[1] - i[0] + 3 ) === ttbDiagGroupIndex) {
              return i;
            }
            return;
          });
        } else {
          winArray = bttDiagWinArray[player].filter((i) => {
            if((i[0] + i[1] - 3) === bttDiagGroupIndex) {
              return i;
            }
            return;
          });
        }
        winner = {
          winType: 'diagonal',
          winArray: winArray,
        }
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
