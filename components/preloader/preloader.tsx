import * as React from 'react';
import { Typography, Portal, CircularProgress } from 'lib-react-components';

import './styles/preloader.sass';

interface IShowEvent {
  preloaderContainer: HTMLElement;
  error: boolean;
}

export default class Applicant extends React.Component<IShowEvent> {
  preloaderContainer: HTMLElement;
  error: boolean;
  constructor(props: IShowEvent) {
    super(props);
    this.preloaderContainer = props.preloaderContainer;
    this.error = props.error;
  }
  render() {
    const { error } = this.props;

    const typography = (
      <Typography className="preloader-p">Preparing transaction</Typography>
    );

    const circularProgress = (
      <CircularProgress
        className="circular-progress"
      />
    );

    const errorMessage = (
      <Typography className="preloader-p error">Failed verification request</Typography>
    );

    return (
      <Portal container={this.preloaderContainer}>
        <div className="preloader">
          {error === true && typography}
          {error === true && circularProgress}
          {error === false && errorMessage}
        </div>
      </Portal>
    );
  }
}
