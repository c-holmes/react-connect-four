import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

import gameData from './data/gameData';

const loggerMiddleware = createLogger();

const defaultState = {
	gameData
};

const store = createStore(
	rootReducer,
	defaultState,
	applyMiddleware(
	  thunkMiddleware, // lets us dispatch() functions
	  loggerMiddleware // neat middleware that logs actions
	)
);

// store.dispatch(fetchAccounts()).then(() =>
//   console.log(store.getState())
// );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
