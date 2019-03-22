import * as React from 'react';
import { Typography, TextField, Portal } from 'lib-react-components';

import './styles/applicant.sass';

interface IShowEvent {
  container: HTMLElement;
  validation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailValid: boolean;
}

export default class Applicant extends React.Component<IShowEvent> {
  container: HTMLElement;
  validation: any;
  textValidation: any;
  constructor(props: IShowEvent) {
    super(props);
    this.container = props.container;
    this.validation = props.validation;
    this.textValidation = props.textValidation;
  }

  render() {
    return (
      <Portal container={this.container}>
        <div className="section border-top">
          <Typography className="section-name" type="h3">
            What email address or phone number would you like to send the verification request to?
        </Typography>
          <TextField
            className="email"
            placeholder="Email/Phone"
            bgType="stroke"
            type={'email' || 'tel'}
            color={this.props.emailValid ? 'light_grey' : 'wrong'}
            textColor={this.props.emailValid ? 'black' : 'wrong'}
            required={true}
            onChange={this.validation}
          />
          <TextField
            className="comment"
            // tslint:disable-next-line:max-line-length
            placeholder="Include a brief description to give the user some context as to why you are requesting this information from them."
            bgType="stroke"
            type="text"
            textColor="black"
            multiLine={true}
            onChange={this.textValidation}
          />
        </div>
      </Portal>
    );
  }
}
