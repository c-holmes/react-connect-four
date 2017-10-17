import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import gameData from './data/game';

const defaultState = {
	gameData
};

const store = createStore(
	rootReducer
);

// store.dispatch().then(() => {
// 	console.log(store.getState());
// });

// export const history = syncHistoryWithStore(browserHistory, store);
export default store;
