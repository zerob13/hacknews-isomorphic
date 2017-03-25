import {
  createStore,
  applyMiddleware
}  from 'redux';
import ReduxThunk from 'redux-thunk';
import mobileReducer from '../reducers';


export default function configureStore(initialState) {
  return applyMiddleware(ReduxThunk)(createStore)(mobileReducer, initialState);
}