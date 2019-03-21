import { Dispatch, Action } from 'redux';

const demoMiddleware = () => (next: Dispatch) => (action: Action) => {
  console.log('Logged action', action);
  next(action);
};

export default demoMiddleware;
