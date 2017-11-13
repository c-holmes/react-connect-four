import React, { Component } from 'react';
const io = require('socket.io-client');
const socket = io();
import AdminBar from './AdminBar';
import Grid from './Grid';
import WinMessage from './WinMessage';

class Game extends Component {
  componentDidMount() {  
    if(this.props.gameData.multiplayer) {
      this.props.playerAssign(this.props.lobbyData.user.player);

      // socket.on('player_assign', (data) => {
      //   this.props.playerAssign('id123', data.playerNum);
      // });

      socket.on('player_submit_move', (data) => {
        this.props.playerSubmitMove(data.id, data.game, data.currTurn, true);
      });

      socket.on('player_game_over_msg', (data) => {
        this.props.playerGameOverMsg(data.id, data.game, data.currTurn, data.winner, data.winStats);
      }); 

      socket.on('game_reset', (data) => {
        this.props.gameReset(data.id, data.gameNum, data.score);
      });
    }
  }

  handleSquareClick(props) {
    if((!this.props.gameData.clicked) && (this.props.gameData.player == this.props.gameData.currTurn)){
      //get position of move
      const gameStatus = this.props.gameData.game.slice();
      const length = gameStatus[props.columnIndex].length - 1;
      let currTurn = props.currTurn
      let index;

      for (let [i, value] of gameStatus[props.columnIndex].entries()){
        //to account for pieces to obey gravity and stack from the bottom up
        if(value !== null){
          index = i - 1;
          break;
        } else if( i === length){
          index =  i;
          break;
        }
      }
      gameStatus[props.columnIndex][index] = currTurn;

      //check if winning move
      let gameDone = this.isGameFinished(gameStatus, currTurn);
      if(gameDone){
        this.props.issueWinMsg('id123', gameStatus, currTurn, true, gameDone);

        if(this.props.gameData.multiplayer){
          //let other player know game is won
          socket.emit('player_game_over_msg', {
            id: 'id123',
            game: gameStatus,
            currTurn: currTurn,
            winner: true,
            winStats: gameDone,
          });
        }
      } else {
        currTurn = 1 - currTurn;
        this.props.nextTurn('id123', gameStatus, currTurn, false);

        if(this.props.gameData.multiplayer){
          socket.emit('player_submit_move', {
            id: 'id123',
            game: gameStatus,
            currTurn: currTurn,
            multiplayer: true,
          });
        } else {
          // single player 
          this.props.playerSubmitMove('id123', gameStatus, currTurn, false);
        }
      }
    }
  }

  handleReset() {
    const currGameNum = this.props.gameData.gameNum + 1;
    const winner = this.props.gameData.currTurn;
    let scoreUpdate = this.props.gameData.score.slice(); 
    scoreUpdate[winner] = scoreUpdate[winner] + 1;
    const resetState = {
      id: 'id123',
      gameNum: currGameNum,
      score: scoreUpdate
    }
    if(this.props.gameData.multiplayer){
      socket.emit('game_reset', resetState);
    } else {
      this.props.gameReset('id123', currGameNum, scoreUpdate);
    }
  }
  
  render() {
    let winMessage;

    if(this.props.gameData.winner){
      winMessage = <WinMessage stats={this.props.gameData.winStats} currTurn={this.props.gameData.currTurn} onClick={(i) => this.handleReset(i)} />;
    } 
    return (
      <div className="Game">
        <AdminBar multiplayer={this.props.gameData.multiplayer} player={this.props.gameData.player} gameNum={this.props.gameData.gameNum} score={this.props.gameData.score} turn={this.props.gameData.currTurn} />
        <div className="board">
          <div className="leg left"><div className="base"><div className="corner"></div></div></div>
          <Grid currTurn={this.props.gameData.currTurn} onClick={(i) => this.handleSquareClick(i)} game={this.props.gameData.game} winStats={this.props.gameData.winStats} />
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
