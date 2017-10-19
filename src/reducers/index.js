import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gameData from './gameData';

const rootReducer = combineReducers({ 
	gameData,
	routing: routerReducer
});

export default rootReducer;
