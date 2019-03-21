import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Demo from './containers/main/main';

ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById('root'));
