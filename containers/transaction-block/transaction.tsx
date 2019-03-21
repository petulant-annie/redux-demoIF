import * as React from 'react';
import { Typography, Button } from 'lib-react-components';
import SvgRedirrect from '../../components/btn-img/svg-arrow';
import SvgEmail from '../../components/btn-img/svg-email';

import './styles/transaction.sass';

interface IClickedEvent {
  showEmail: any;
  hideEmail: any;
  applicantShown: boolean;
}

export default class Transactions extends React.Component<IClickedEvent> {
  handleEmailClick: React.MouseEventHandler<HTMLButtonElement>;
  handleEmailHide: React.MouseEventHandler<HTMLButtonElement>;

  constructor(props: IClickedEvent) {
    super(props);
    this.handleEmailClick = props.showEmail;
    this.handleEmailHide = props.hideEmail;
  }

  render() {
    const { applicantShown } = this.props;

    return (
      <div className="section">
        <Typography className="section-name" type="h3">Transaction type</Typography>
        <Button
          data-border={!applicantShown}
          className="redirect-item first-item-btn"
          bgType="stroke"
          color={applicantShown ? 'light_grey' : 'primary'}
          textColor={applicantShown ? 'black' : 'primary'}
          onClick={this.handleEmailHide}
        >
          <SvgRedirrect fill={applicantShown ? '#5b647d' : '#3d7dff'} />
          <span className="btn-text">Redirect</span>
        </Button>

        <Button
          data-border={applicantShown}
          className="redirect-item"
          bgType="stroke"
          color={applicantShown ? 'primary' : 'light_grey'}
          textColor={applicantShown ? 'primary' : 'black'}
          onClick={this.handleEmailClick}
        >
          <SvgEmail fill={(applicantShown ? '#3d7dff' : '#5b647d')} />
          <span className="btn-text">Email or SMS</span>
        </Button>
      </div>
    );
  }
}
