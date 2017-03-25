import 'core-js/fn/object/assign';
import React from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import App from './routers';
import {
  render
} from 'react-dom';
import {
  Provider
} from 'react-redux';
import {
  routerMiddleware,
  ConnectedRouter
} from 'react-router-redux';
import transit from 'transit-immutable-js';
import configureStore from './store/configureStore';
import createHistory from 'history/createBrowserHistory'

require('es6-promise').polyfill();

const loc = `${window.location.pathname}${window.location.search}${window.location.hash}`;
const initialState = transit.fromJSON(window.__INITIAL_STATE__);
const history = createHistory();
const middleware = routerMiddleware(history)
const store = configureStore(initialState, middleware);

// match({mobileRoutes, location: loc}, () => {
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <BrowserRouter history={history}>
          <App/>
        </BrowserRouter>
    </ConnectedRouter>
    </Provider>,
  document.getElementById('app')
);
// });
