function gameData (state = {}, action) {
	switch (action.type) {
		case 'SUBMIT_MOVE':
			//console.log('submit move');
			const gameStatus = state.game;
			let currTurn = state.currTurn;
			console.log(gameStatus);
			// let gameDone = this.isGameFinished(gameStatus, currTurn);
			// if(gameDone){
			//   this.setState({
			//     winner: true,
			//     winStats: gameDone
			//   });
			//   if(this.state.multiplayer){
			//     socket.emit('game_won', {
			//       game: gameStatus,
			//       currTurn: currTurn,
			//       winner: true,
			//       winStats: gameDone,
			//     });
			//   }
			// } else {
			//   currTurn = 1 - currTurn;
			//   this.setState({
			//     currTurn: currTurn,
			//     clicked: false,
			//   });
			//   if(this.state.multiplayer){
			//     socket.emit('submit_move', {
			//       game: gameStatus,
			//       currTurn: currTurn
			//     });
			//   } else {
			//     this.setState({
			//       player: currTurn
			//     })
			//   }
			// }
			return state;
		default:
			return state;
	}
}

export default gameData;