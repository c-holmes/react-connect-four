function lobbyData (state = {}, action) {
	const newState = Object.assign({}, state);

	switch (action.type) {
		case 'ADD_CURR_USER' :
			let currUser = {
				id: action.id,
				userName: action.userName,
				player: action.playerNum
			}
			newState.user = currUser;
			return newState;
		break;

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
		break;

		case 'JOIN_HOSTED_GAME' :
			// TODO: add player2 to Hosted Game State
			// TODO: remove game from available games
			return newState;
		break;
		default:
			return state;
	}
}

export default lobbyData;