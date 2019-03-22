import {
  ISetCheckboxesAction,
  ISetPreloaderAction,
  ICheckErrorAction,
  ISetEmailFieldValueAction,
  ISetCommentValueAction,
} from '../actions/demoActions';

export interface IInitialState {
  checkboxes: string[] | null[];
  showPreloader: boolean;
  error: boolean;
  value: {};
  commentValue: string;
}

const INITIAL_STATE: IInitialState = {
  checkboxes: [null, null, null, null],
  showPreloader: false,
  error: true,
  value: {},
  commentValue: '',
};

const demoState = (
  state = INITIAL_STATE,
  action: ISetCheckboxesAction &
    ISetPreloaderAction & ICheckErrorAction &
    ISetCommentValueAction & ISetEmailFieldValueAction,
) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return { ...state, checkboxes: action.checkboxes };
    case 'SHOW_PRELOADER':
      return { ...state, showPreloader: action.showPreloader };
    case 'ERROR':
      return { ...state, error: action.error };
    case 'EMAIL_FIELD_VALUE' && 'COMMENT_FIELD_VALUE':
      return { ...state, value: action.value, commentValue: action.commentValue };
    default:
      return state;
  }
};

export default demoState;
