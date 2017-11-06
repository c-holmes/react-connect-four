import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import gameData from './gameData';
import lobbyData from './lobbyData';

const rootReducer = combineReducers({ 
	gameData,
	lobbyData,
	form: formReducer,
	routing: routerReducer
});

export default rootReducer;
