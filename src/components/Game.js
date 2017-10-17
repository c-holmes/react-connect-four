import React, { Component } from 'react';
const io = require('socket.io-client');
const socket = io();
import AdminBar from './AdminBar';
import Grid from './Grid';
import WinMessage from './WinMessage';

class Game extends Component {
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
      currTurn: 0,
      player: 0,
      clicked: false,
      winner: false,
      winStats: false,
      multiplayer: true,
      gameNum: 0,
      score: [0, 0]
    }
  }

  componentDidMount() {  
    if(this.state.multiplayer) {
      socket.on('player_assign', (playerNum) => {
        this.setState({
          player: playerNum
        })
      });

      socket.on('submit_move', (data) => {
        this.setState({
          game: data.game,
          currTurn: data.currTurn
        })
      });

      socket.on('game_won', (data) => {
        this.setState({
          game: data.game,
          currTurn: data.currTurn,
          winner: data.winner,
          winStats: data.winStats
        })
      }); 

      socket.on('game_reset', (data) => {
        this.setState({
          game: data.game,
          currTurn: data.currTurn,
          clicked: data.clicked,
          winner: data.winner,
          winStats: data.winStats,
          gameNum: data.gameNum,
          score: data.score
        })
      });
    }
  }

  submitMove() {
    const gameStatus = this.state.game.slice();
    let currTurn = this.state.currTurn;
    let gameDone = this.isGameFinished(gameStatus, currTurn);
    if(gameDone){
      this.setState({
        winner: true,
        winStats: gameDone
      });
      if(this.state.multiplayer){
        socket.emit('game_won', {
          game: gameStatus,
          currTurn: currTurn,
          winner: true,
          winStats: gameDone,
        });
      }
    } else {
      currTurn = 1 - currTurn;
      this.setState({
        currTurn: currTurn,
        clicked: false,
      });
      if(this.state.multiplayer){
        socket.emit('submit_move', {
          game: gameStatus,
          currTurn: currTurn
        });
      } else {
        this.setState({
          player: currTurn
        })
      }
    }
  }

  handleSquareClick(props) {
    this.props.submitMove('test1','test2','test3');
    if((!this.state.clicked) && (this.state.player == this.state.currTurn)){
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

      newGameStatus[props.columnIndex][index] = props.currTurn;
      this.setState({
        game: newGameStatus,
        clicked: true,
      });

      this.submitMove();
    }
  }

  handleReset() {
    const currGameNum = this.state.gameNum + 1;
    const winner = this.state.currTurn;
    let scoreUpdate = this.state.score.slice(); 
    scoreUpdate[winner] = scoreUpdate[winner] + 1;
    const resetState = {
      game: [ 
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      currTurn: 0,
      clicked: false,
      winner: false,
      winStats: false,
      gameNum: currGameNum,
      score: scoreUpdate
    }
    if(this.state.multiplayer){
      console.log(resetState);
      socket.emit('game_reset', resetState);
    } else {
      this.setState(resetState);
    }
  }
  
  render() {
    let winMessage;
    if(this.state.winner){
      winMessage = <WinMessage stats={this.state.winStats} currTurn={this.state.currTurn} onClick={(i) => this.handleReset(i)} />;
    } 
    return (
      <div className="Game">
        <AdminBar multiplayer={this.state.multiplayer} player={this.state.player} gameNum={this.state.gameNum} score={this.state.score} turn={this.state.currTurn} />
        <div className="board">
          <div className="leg left"><div className="base"><div className="corner"></div></div></div>
          <Grid currTurn={this.state.currTurn} onClick={(i) => this.handleSquareClick(i)} game={this.state.game} winStats={this.state.winStats} />
          <div className="leg right"><div className="base"><div className="corner"></div></div></div>
        </div>
        {winMessage}
      </div>
    );
  }

  isGameFinished(gameArray, currTurn){
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

    function checkForVerticalWin(pieceValue, pieceIndex, columnIndex, currTurn) {
      //count consecutive pieces
      if (pieceValue !== null && pieceValue === currTurn) {
        vertPiecesArray[columnIndex]++;
        vertWinArray[currTurn].push([columnIndex,pieceIndex]);
      } else {
        vertPiecesArray[columnIndex] = null;
      }

      //check if theres a winner
      if (vertPiecesArray[columnIndex] === winNum) {
        //only return the winning indexes
        const winArray = vertWinArray[currTurn].filter((i) => {
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

    function checkForHorizontalWin(pieceValue, pieceIndex, columnIndex, currTurn) {
      if ( pieceValue !== null && pieceValue === currTurn) {
        horsPiecesArray[pieceIndex]++;
        horsWinArray[currTurn].push([columnIndex,pieceIndex]);
      } else {
        horsPiecesArray[pieceIndex] = null;
      }

      //check if theres a winner
      if (horsPiecesArray[pieceIndex] === winNum) {
        const winArray = horsWinArray[currTurn].filter((i) => {
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

    function checkForDiagonalWin(pieceValue, pieceIndex, columnIndex, currTurn) {
      // a diagonal win can either come from bottom to top (btt) or top to bottom (ttb)
      // To group squares into their appropriate diagonals array, we must subtract the piece index and column index, to get a common number
      // 3 is added to keep numbers positive, so they map to the correct array index
      let ttbDiagGroupIndex = pieceIndex - columnIndex + 3;
      let bttDiagGroupIndex = pieceIndex + columnIndex - 3;

      if (pieceValue !== null && pieceValue === currTurn) {
        // we are only checking the 5 diagonal groups that have a total of 4 or more pieces 
        if(ttbDiagGroupIndex <= 6 && ttbDiagGroupIndex >= 0){
          ttbDiagPiecesArray[ttbDiagGroupIndex]++;
          ttbDiagWinArray[currTurn].push([columnIndex,pieceIndex]);                
        }
        if (bttDiagGroupIndex <= 5 && bttDiagGroupIndex >= 0) {
          bttDiagPiecesArray[bttDiagGroupIndex]++;
          bttDiagWinArray[currTurn].push([columnIndex,pieceIndex]);
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
          winArray = ttbDiagWinArray[currTurn].filter((i) => {
            if((i[1] - i[0] + 3 ) === ttbDiagGroupIndex) {
              return i;
            }
            return;
          });
        } else {
          winArray = bttDiagWinArray[currTurn].filter((i) => {
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
          checkForVerticalWin(pieceValue, pieceIndex, columnIndex, currTurn);
          if (winner) break;
          
          checkForHorizontalWin(pieceValue, pieceIndex, columnIndex, currTurn);
          if (winner) break;

          checkForDiagonalWin(pieceValue, pieceIndex, columnIndex, currTurn);
          if (winner) break;
        }
      }
    }

    return winner;
  }
}

export default Game;
