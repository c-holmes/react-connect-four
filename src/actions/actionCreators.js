export function submitMove(id) {
	return {
		type: 'SUBMIT_MOVE',
		id,
		gameState,
		currTurn
	}
}