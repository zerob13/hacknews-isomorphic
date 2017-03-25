import {
  createStore,
  applyMiddleware
}  from 'redux';
import ReduxThunk from 'redux-thunk';
import mobileReducer from '../reducers';


export default function configureStore(initialState,history) {
  return applyMiddleware(ReduxThunk,history)(createStore)(mobileReducer, initialState);
}
