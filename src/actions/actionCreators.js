export function issueWinMsg(id, winner, winStats) {
	return {
		type: 'ISSUE_WIN_MSG',
		id,
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