import React, {
  PropTypes,
  Component
} from 'react';
import {
  connect
} from 'react-redux';


if (process.env.IS_BUNDLING_FOR_BROWSER) {
  require('./News.scss');
}

class News extends Component {
  render() {
    return (
      <div className="home-wrap">
      news！
    </div>);
  }
}

export default connect((state) => ({
  routing: state.routing
}))(News);
