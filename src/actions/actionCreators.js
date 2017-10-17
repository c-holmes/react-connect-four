export function submitMove(id, gameState, currTurn) {
	return {
		type: 'SUBMIT_MOVE',
		id,
		gameState,
		currTurn
	}
}