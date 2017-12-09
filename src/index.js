import React from 'react';
import ReactDOM from 'react-dom';

import { Router, IndexRoute, Route } from 'react-router'
import { Provider } from 'react-redux';

import App from './components/App';
import GameMenu from './components/GameMenu';
import Lobby from './components/Lobby';
import Game from './components/Game';

require('./styles/style.scss');

import store, { history } from './store';

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
	  	<Route path="/" component={App}>
	  		<IndexRoute component={GameMenu}></IndexRoute>
	  		<Route path="/play" component={Game}></Route>
	  		<Route path="/play/:gameId" component={Game}></Route>
	  		<Route path="/lobby" component={Lobby}></Route>
	  	</Route>
	  </Router>
	</Provider>
), document.getElementById('root'))

// registerServiceWorker();
// Service workers are only available to "secure origins" (HTTPS sites, basically)

// <Route path="/" component={App}>
// 	<IndexRoute component={Test}></IndexRoute>
// 	<Route path="/view/:postId" component={Game}></Route>
// </Route>