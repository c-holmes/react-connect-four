import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import App from './components/App';

require('./styles/style.scss');

import store, { history } from './store';

ReactDOM.render((
	<Provider store={store}>
	  <App />
	</Provider>
), document.getElementById('root'))

// registerServiceWorker();
// Service workers are only available to "secure origins" (HTTPS sites, basically)
