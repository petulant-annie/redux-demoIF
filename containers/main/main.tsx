import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Typography, Button } from 'lib-react-components';

import {
  toggleCheckbox,
  showPreloader,
  error,
  emailFieldValue,
  commentFieldValue,
} from '../../actions/demoActions';
import { IInitialState } from '../../reducers/demoReducers';
import Header from '../../components/header/header';
import Verification from '../verification-block/verification';
import Transactions from '../transaction-block/transaction';
import Applicant from '../applicant-block/applicant';
import Preloader from '../../components/preloader/preloader';
import Slider from '../../components/slider/slider';
import apiRequests from './api';
import clock from '../../assets/images/slider-images/slider-clock.svg';
import id from '../../assets/images/slider-images/slider-id.svg';
import license from '../../assets/images/slider-images/slider-license.svg';

import './styles/main.sass';

interface ICheckedState {
  getStartedDisabled: boolean;
  showEmailField: boolean;
  emailValid: boolean;
}

interface IProps<IInitialState> {
  demoState: IInitialState;
  toggleCheckbox: (checkboxes: string[]) => void;
  showPreloader: (showPreloader: boolean) => void;
  error: (error: boolean) => void;
  emailFieldValue: (value: {}) => void;
  commentFieldValue: (commentValue: string) => void;
}

class Demo extends React.Component<IProps<IInitialState>, ICheckedState> {
  container: HTMLElement;
  preloaderContainer: HTMLElement;
  ticket: string;
  applicantRef = React.createRef<HTMLDivElement>();
  preloaderRef = React.createRef<HTMLDivElement>();
  constructor(props: IProps<IInitialState>) {
    super(props);
    this.state = {
      getStartedDisabled: true,
      showEmailField: false,
      emailValid: false,
    };
    this.ticket = '';
    this.applicantRef = React.createRef<HTMLDivElement>();
    this.preloaderRef = React.createRef<HTMLDivElement>();
    this.container = null;
    this.preloaderContainer = null;
  }

  handleCheckboxClick = (position: number, type: string) => {
    const checkboxes = this.props.demoState.checkboxes;
    let getStartedDisabled = true;

    checkboxes[position] == null ? checkboxes[position] = type : checkboxes[position] = null;
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (checkboxes[i] !== null) getStartedDisabled = false;
    }
    this.setState({ getStartedDisabled: (getStartedDisabled) });
    this.props.toggleCheckbox(checkboxes);
  }

  handleEmailClick() {
    const e = () => {
      this.setState({ showEmailField: true });
    };

    return e;
  }

  handleEmailHide() {
    const e = () => {
      this.setState({ showEmailField: false });
    };

    return e;
  }

  emailValidation() {
    const value = (e: React.ChangeEvent<HTMLInputElement>) => {

      const val: RegExpMatchArray = e.target.value.match(/.+@.+\..+/ig);
      const numVal: RegExpMatchArray =
        e.target.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ig);

      if (val || numVal) {
        this.props.emailFieldValue({ [(val ? 'email' : 'phone')]: e.target.value });
        this.setState({ emailValid: true });
        this.props.emailFieldValue(e.target.value);
      } else {
        this.props.emailFieldValue(e.target.value);
        this.setState({ emailValid: false });
      }
    };

    return value;
  }

  textValidation() {
    const comment = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.commentFieldValue(e.target.value);
    };

    return comment;
  }

  startRequest() {
    const start = () => {
      this.props.demoState.showPreloader = true;
      this.setState({ getStartedDisabled: true });
      this.props.showPreloader(this.props.demoState.showPreloader);
      try {
        apiRequests(this.props.demoState)
          .catch(err => (this.props.error(false)));
      }
      finally { start; }
    };

    return start;
  }

  render() {
    const {
      showEmailField,
      emailValid,
    } = this.state;

    const showPreloader = this.props.demoState.showPreloader;

    let getStartedDisabled = this.state.getStartedDisabled;
    if (this.state.showEmailField) {
      if (this.state.emailValid) getStartedDisabled = this.state.getStartedDisabled;
      else getStartedDisabled = true;
    }

    const applicant = (
      <Applicant
        container={this.applicantRef.current}
        validation={this.emailValidation()}
        textValidation={this.textValidation()}
        emailValid={emailValid}
      />
    );

    const preloader = (
      <Preloader
        error={this.props.demoState.error}
        preloaderContainer={this.preloaderRef.current}
      />
    );

    return (
      <div className="main-block">
        <Header />
        <div id="action-section">
          <div className="section border">
            <Typography
              className="section-name first-section"
              type="h2"
            >
              What evidence do you want to verify?
            </Typography>
            <Typography className="section-p" type="b1">
              IdentityFront supports evidence capture via a redirect,
              email or a SMS to support all of your use cases.
              </Typography>
          </div>

          <Verification handler={this.handleCheckboxClick} />

          <Transactions
            showEmail={this.handleEmailClick()}
            hideEmail={this.handleEmailHide()}
            applicantShown={this.state.showEmailField}
          />

          {showEmailField && applicant}
          <div ref={this.applicantRef} />

          <div className="section bottom-block">
            <Button
              className="start-btn"
              size="large"
              disabled={getStartedDisabled}
              onClick={this.startRequest()}
            >
              Get Started
            </Button>
            {showPreloader && preloader}
            <div ref={this.preloaderRef} />
          </div>
        </div>
        <div className="slider-wrapper">
          <Slider
            speed={3000}
            pause={false}
            pagination={true}
            animation={true}
          >
            <div>
              <div className="pic-wrapper">
                <img className="slider-img" src={clock} alt="clock" />
              </div>
              <Typography className="section-name slider-h" type="h2" align="center" >
                Identity verification for the modern web
            </Typography>
              <Typography className="section-p slider-p" type="b1" align="center">
                It is easy, secure and in compliance with the law
              </Typography>
            </div>
            <div>
              <div className="pic-wrapper">
                <img className="slider-img" src={id} alt="id" />
              </div>
              <Typography className="section-name slider-h" type="h2" align="center" >
                Identity verification for the modern web
            </Typography>
              <Typography className="section-p slider-p" type="b1" align="center">
                No need for users to install and register with another application
              </Typography>
            </div>
            <div>
              <div className="pic-wrapper">
                <img className="slider-img" src={license} alt="license" />
              </div>
              <Typography className="section-name slider-h" type="h2" align="center" >
                Identity verification for the modern web
            </Typography>
              <Typography className="section-p slider-p" type="b1" align="center">
                Verify your customers’ identity in a seconds
              </Typography>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IProps<IInitialState>) => state;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    toggleCheckbox,
    showPreloader,
    error,
    emailFieldValue,
    commentFieldValue,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
