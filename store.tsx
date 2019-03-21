import { createStore, combineReducers, applyMiddleware } from 'redux';

import demoState from './reducers/demoReducers';
import demoMiddleware from './middleware/demoMiddleware';

const store = createStore(
  combineReducers({
    demoState,
  }),
  {},
  applyMiddleware(demoMiddleware),
);

export default store;
