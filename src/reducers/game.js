function game (state = [], action) {
	switch (action.type) {
		case 'SUBMIT_MOVE':
			console.log('submit move');
			return state;
		default:
			return state;
	}
}

export default game;