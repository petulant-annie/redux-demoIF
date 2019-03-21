import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';

import demoState from './reducers/demoReducers';

const store = createStore(
  combineReducers({
    demoState,
  }),
  {},
  applyMiddleware(logger),
);

export default store;
