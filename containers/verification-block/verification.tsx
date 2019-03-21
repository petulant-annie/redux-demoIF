import * as React from 'react';
import { Typography, Switch } from 'lib-react-components';
import './styles/verification.sass';

interface ICheckedEvent {
  handler: React.ReactNode;
}

export default class Verification extends React.Component<ICheckedEvent> {
  handleChangeEvent: any;
  constructor(props: ICheckedEvent) {
    super(props);
    this.handleChangeEvent = props.handler;
  }

  event = (i: number, type: string) => this.handleChangeEvent.bind(this, i, type);

  render() {
    return (
      <div className="section border">
        <Typography
          className="section-name"
          type="h3"
        >
          How would you like to try out IdentityFront?
        </Typography>
        <div className="list">
          <Typography className="text" type="b2">Selfie</Typography>
          <Switch
            onCheck={this.event(0, 'selfie')}
          />
        </div>
        <div className="list">
          <Typography className="text" type="b2">License</Typography>
          <Switch
            onCheck={this.event(1, 'license')}
          />
        </div>
        <div className="list">
          <Typography className="text" type="b2">Passport</Typography>
          <Switch
            onCheck={this.event(2, 'passport')}
          />
        </div>
        <div className="list">
          <Typography className="text" type="b2">Personal information</Typography>
          <Switch
            onCheck={this.event(3, 'personal_information')}
          />
        </div>
      </div>
    );
  }
}
