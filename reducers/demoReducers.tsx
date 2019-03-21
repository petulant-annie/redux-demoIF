import { ICheckboxes, IShowPreloader, IError, IFieldValue } from '../actions/demoActions';

const INITIAL_STATE = [
  {
    checkboxes: [
      false,
      false,
      false,
      false,
    ],
    showPreloader: false,
    error: true,
    value: {},
    commentValue: '',
  },
];

const demoState = (
  state = INITIAL_STATE,
  action: ICheckboxes & IShowPreloader & IError & IFieldValue,
) => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      return [
        ...state,
        {
          checkboxes: action.checkboxes,
        },
      ];
    case 'SHOW_PRELOADER':
      return [
        ...state,
        {
          showPreloader: action.showPreloader,
        },
      ];
    case 'ERROR':
      return [
        ...state,
        {
          error: action.error,
        },
      ];
    case 'FIELDS_VALUE':
      return [
        ...state,
        {
          value: action.value,
          commentValue: action.commentValue,
        },
      ];
    default:
      return state;
  }
};

export default demoState;
