export interface ICheckboxes {
  type: string;
  checkboxes: string[];
}

export interface IShowPreloader {
  type: string;
  showPreloader: boolean;
}

export interface IError {
  type: string;
  error: boolean;
}

export interface IEmailFieldValue {
  type: string;
  value: {};
}

export interface ICommentValue {
  type: string;
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

export const emailFieldValue = (value: IEmailFieldValue) => ({
  value,
  type: 'EMAIL_FIELD_VALUE',
});

export const commentFieldValue = (commentValue: ICommentValue) => ({
  commentValue,
  type: 'COMMENT_FIELD_VALUE',
});
