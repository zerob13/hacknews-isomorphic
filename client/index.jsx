import 'core-js/fn/object/assign';
import React from 'react';
import {match, Router, browserHistory} from 'react-router';
import mobileRoutes from './routers';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import transit from 'transit-immutable-js';
import configureStore from './store/configureStore';
require('es6-promise').polyfill();

const loc = `${window.location.pathname}${window.location.search}${window.location.hash}`;
const initialState = transit.fromJSON(window.__INITIAL_STATE__);
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

match({mobileRoutes, location: loc}, () => {
  render(
    <Provider store={store}>
      <Router routes={mobileRoutes} history={history}/>
    </Provider>,
    document.getElementById('app')
  )
});

