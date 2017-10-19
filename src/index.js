import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router'
import { Provider } from 'react-redux';

import App from './components/App';

require('./styles/style.scss');

import store, { history } from './store';

ReactDOM.render((
	<Provider store={store}>
		<Router history={history}>
	  	<Route path="/" component={App}></Route>
	  </Router>
	</Provider>
), document.getElementById('root'))

// registerServiceWorker();
// Service workers are only available to "secure origins" (HTTPS sites, basically)
