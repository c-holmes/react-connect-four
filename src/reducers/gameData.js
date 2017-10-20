function gameData (state = {}, action) {
	switch (action.type) {
		case 'NEXT_TURN':
			const newState = Object.assign({}, state);
			const updatedGameStatus = action.gameStatus.slice();
			newState.game = updatedGameStatus;
		
			return newState;
		default:
			return state;
	}
}

export default gameData;