// const io = require('socket.io-client');
// const socket = io();

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

export function gameReset(id, gameStatus, currTurn, clicked, winner, winStats, gameNum, score) {
	return {
		type: 'GAME_RESET',
		id,
		gameStatus,
		currTurn,
		clicked,
		winner,
		winStats,
		gameNum,
		score,
	}
}

export function playerAssign(id, playerNum) {
	return {
		type: 'PLAYER_ASSIGN',
		id,
		playerNum,
	}
}

export function playerSubmitMove(id, gameStatus, currTurn) {
	return {
		type: 'PLAYER_SUBMIT_MOVE',
		id,
		gameStatus,
		currTurn,
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

// Async Action Items (Sockets
// export function submitMove(id, gameStatus, currTurn) {
// 	return (dispatch) => {
// 		socket.emit('submit_move', {
// 		  game: gameStatus,
// 		  currTurn: currTurn
// 		});
// 	}
// }

// export function playerAssign(playerNum) {
// 	return (dispatch) => {
// 		socket.emit('')
// 	}
// }