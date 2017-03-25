import {
  createStore,
  applyMiddleware
} from 'redux';
import ReduxThunk from 'redux-thunk';
import mobileReducer from '../reducers';
import {
  createLogger
} from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState, history) {
  return applyMiddleware(ReduxThunk, logger, history)(createStore)(mobileReducer, initialState);
}
