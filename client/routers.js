import React from 'react';
import {
  Route
} from 'react-router-dom';
import News from './containers/News';

//new top show ask job item user
export default () => (
  <div>
    <Route path='/news' component={News} />
  </div>
);
