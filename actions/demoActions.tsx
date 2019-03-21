export interface ICheckboxes {
  type: string;
  checkboxes: boolean;
}

export interface IShowPreloader {
  type: string;
  showPreloader: boolean;
}

export interface IError {
  type: string;
  error: boolean;
}

export interface IFieldValue {
  type: string;
  value: {};
  commentValue: string;
}

export const toggleCheckbox = (checkboxes: ICheckboxes) => ({
  checkboxes,
  type: 'TOGGLE_CHECKBOX',
});

export const showPreloader = (showPreloader: IShowPreloader) => ({
  showPreloader,
  type: 'SHOW_PRELOADER',
});

export const error = (error: IError) => ({
  error,
  type: 'ERROR',
});

export const fieldsValue = (value: IFieldValue, commentValue: IFieldValue) => ({
  value,
  commentValue,
  type: 'FIELDS_VALUE',
});
