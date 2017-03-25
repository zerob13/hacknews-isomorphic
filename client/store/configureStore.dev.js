import {
  createStore,
  applyMiddleware
}  from 'redux';
import ReduxThunk from 'redux-thunk';
import mobileReducer from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState) {
  return applyMiddleware(ReduxThunk, logger)(createStore)(mobileReducer, initialState);
}