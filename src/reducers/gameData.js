function gameData (state = {}, action) {
	const newState = Object.assign({}, state);

	switch (action.type) {
		case 'NEXT_TURN':
			let updatedGameStatus = action.gameStatus.slice();
			newState.game = updatedGameStatus;
		
			return newState;
		case 'ISSUE_WIN_MSG':
			newState.game = action.gameStatus.slice();
			newState.currTurn = action.currTurn;
			newState.winner = action.winner;
			newState.winStats = action.winStats;

			return newState;
		case 'GAME_RESET':
			newState.game = action.gameStatus.slice();
			newState.currTurn = action.currTurn;
			newState.clicked = action.clicked;
			newState.winner = action.winner;
			newState.winStats = action.winStats;
			newState.gameNum = action.gameNum;
			newState.score = action.score;

			return newState;
		case 'PLAYER_ASSIGN':
			newState.player = action.playerNum;

			return newState;
		case 'PLAYER_SUBMIT_MOVE':
			newState.game = action.gameStatus.slice();
			newState.currTurn = action.currTurn;

			return newState;
		case 'PLAYER_GAME_OVER_MSG':
			newState.game = action.gameStatus.slice();
			newState.currTurn = action.currTurn;
			newState.winner = action.winner;
			newState.winStats = action.winStats;

			return newState;
		default:
			return state;
	}
}

export default gameData;