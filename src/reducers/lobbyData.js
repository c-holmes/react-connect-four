function lobbyData (state = {}, action) {
	const newState = Object.assign({}, state);

	switch (action.type) {
		case 'CREATE_HOSTED_GAME' :
			let gameHostObj = {
				id: action.id,
				player1: action.userName
			}
			newState.availableGames.push(gameHostObj);
			return newState;
		break;
		case 'HOSTED_GAME_AVAILABLE' :
			let availGame = {
				id: action.id,
				player1: action.userName
			}
			newState.availableGames.push(availGame);
			return newState;
		default:
			return state;
	}
}

export default lobbyData;