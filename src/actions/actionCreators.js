import fetch from 'isomorphic-fetch';

export function gameStart(id, multiplayer) {
	return {
		type: 'GAME_START',
		id,
		multiplayer
	}
}

export function issueWinMsg(id, gameStatus, currTurn, winner, winStats) {
	return {
		type: 'ISSUE_WIN_MSG',
		id,
		gameStatus,
		currTurn,
		winner,
		winStats,
	}
}

export function nextTurn(id, gameStatus, currTurn, clicked) {
	return {
		type: 'NEXT_TURN',
		id,
		gameStatus,
		currTurn,
		clicked,
	}
}

export function gameReset(id, gameNum, score) {
	return {
		type: 'GAME_RESET',
		id,
		gameNum,
		score,
	}
}

export function playerAssign(playerNum) {
	return {
		type: 'PLAYER_ASSIGN',
		playerNum,
	}
}

export function playerSubmitMove(id, gameStatus, currTurn, multiplayer) {
	return {
		type: 'PLAYER_SUBMIT_MOVE',
		id,
		gameStatus,
		currTurn,
		multiplayer,
	}
}

export function playerGameOverMsg(id, gameStatus, currTurn, winner, winStats) {
	return {
		type: 'PLAYER_GAME_OVER_MSG',
		id,
		gameStatus,
		currTurn,
		winner,
		winStats,
	}
}

export function createHostedGame(id, userName) {
	return {
		type: 'CREATE_HOSTED_GAME',
		id,
		userName
	}
}

export function hostedGameAvailable(id, userName) {
	return {
		type: 'HOSTED_GAME_AVAILABLE',
		id,
		userName
	}
}

export function addCurrUser(id, userName, playerNum) {
	return {
		type: 'ADD_CURR_USER',
		id,
		userName,
		playerNum
	}
}

export function showAvailableGames(gamesObj) {
	return {
		type: 'SHOW_AVAILABLE_GAMES',
		gamesObj
	}
}

export function fetchAvailableGames() {
	return (dispatch) => {
		if (!window.location.origin) {
		  window.location.origin = `${window.location.protocol} // ${window.location.hostname}  ${window.location.port ? ':' + window.location.port : ''}`;
		}
		const origin = window.location.origin;

		return fetch(`${origin}/api/games/`)
		  .then(response => response.json())
		  .then(json => dispatch(receiveData(json, 'games')));
	};
}