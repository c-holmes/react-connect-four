import fetch from 'isomorphic-fetch';

function lobbyData (state = {}, action) {
	if (!window.location.origin) {
	    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	const origin = window.location.origin;
	const newState = Object.assign({}, state);

	function serialize(obj) {
	  var str = [];
	  for(var p in obj)
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    }
	  return str.join("&");
	}

	switch (action.type) {
		case 'ADD_CURR_USER' :
			let currUser = {
				_id: action.id,
				userName: action.userName,
				player: action.playerNum
			}
			newState.user = currUser;
			return newState;
		break;

		case 'CREATE_HOSTED_GAME' :
			let gameHostObj = {
				_id: action.id,
				player1: action.userName,
				date: new Date()
			}
			newState.availableGames.push(gameHostObj);

			fetch(`${origin}/api/games`, {
				method: 'post',
				headers: {
					"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				body: serialize(gameHostObj)
			})
			.then(response => response.json())
			.then((data) => {
				console.log('Request succeeded with JSON response', data);
			})
			.catch(() => {
				console.log('Request failed', error)
			})

			return newState;
		break;

		case 'HOSTED_GAME_AVAILABLE' :
			let availGame = {
				_id: action.id,
				player1: action.userName
			}
			newState.availableGames.push(availGame);
			return newState;
		break;

		case 'SHOW_AVAILABLE_GAMES' :
			let availGames = action.gamesObj
			newState.availableGames = availGames;
			return newState;
		break;

		case 'JOIN_HOSTED_GAME' :
			fetch(`${origin}/api/games/${action.id}`, {
				method: 'delete',
			})
			.then(response => response.json())
			.then((data) => {
				console.log(data);
			});

			newState[action.index] = null;
			console.log('Deleted');
			// newState = newState.filter(function(n){ return n != undefined }); 

			return newState;
		break;
		default:
			return state;
	}
}

export default lobbyData;