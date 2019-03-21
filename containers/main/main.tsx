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
  checkboxes: string[];
  getStartedDisabled: boolean;
  show: boolean;
  showPreloader: boolean;
  error: boolean;
  emailValid: boolean;
  value: {};
  commentValue: string;
}

interface IProps {
  demoState: [];
  toggleCheckbox: (checkboxes: string[]) => void;
  showPreloader: (showPreloader: boolean) => void;
  error: (error: boolean) => void;
  emailFieldValue: (value: {}) => void;
  commentFieldValue: (commentValue: string) => void;
}

class Demo extends React.Component<IProps, ICheckedState> {
  container: HTMLElement;
  preloaderContainer: HTMLElement;
  ticket: string;
  applicantRef = React.createRef<HTMLDivElement>();
  preloaderRef = React.createRef<HTMLDivElement>();
  constructor(props: IProps) {
    super(props);
    this.state = {
      checkboxes: [
        null,
        null,
        null,
        null,
      ],
      getStartedDisabled: true,
      show: false,
      showPreloader: false,
      error: true,
      emailValid: false,
      value: {},
      commentValue: '',
    };
    this.ticket = '';
    this.applicantRef = React.createRef<HTMLDivElement>();
    this.preloaderRef = React.createRef<HTMLDivElement>();
    this.container = null;
    this.preloaderContainer = null;
  }

  handleClick = (position: number, type: string) => {
    const checkboxes = this.state.checkboxes;
    let getStartedDisabled = true;

    checkboxes[position] == null ? checkboxes[position] = type : checkboxes[position] = null;
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (checkboxes[i] !== null) getStartedDisabled = false;
    }
    this.setState({ checkboxes: (checkboxes), getStartedDisabled: (getStartedDisabled) });
    this.props.toggleCheckbox(this.state.checkboxes);
  }

  handleEmailClick() {
    const e = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.setState({ show: true });
    };

    return e;
  }

  handleEmailHide() {
    const e = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.setState({ show: false });
    };

    return e;
  }

  emailValidation() {
    const value = (e: React.ChangeEvent<HTMLInputElement>) => {

      const val: RegExpMatchArray = e.target.value.match(/.+@.+\..+/ig);
      const numVal: RegExpMatchArray =
        e.target.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ig);

      if (val || numVal) {
        this.setState({ value: { [(val ? 'email' : 'phone')]: e.target.value }, emailValid: true });
        this.props.emailFieldValue(e.target.value);
      } else {
        this.setState({ value: null, emailValid: false });
      }
    };

    return value;
  }

  textValidation() {
    const comment = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ commentValue: e.target.value });
      this.props.commentFieldValue(this.state.commentValue);
    };

    return comment;
  }

  startRequest() {
    const start = () => {
      this.setState({ showPreloader: true, getStartedDisabled: true });
      this.props.showPreloader(this.state.showPreloader);
      try {
        apiRequests(this.state)
          .catch(err => (this.setState({ error: false })));
        this.props.error(this.state.error);
      }
      finally { start; }
    };

    return start;
  }

  render() {
    const {
      show,
      showPreloader,
      emailValid,
    } = this.state;

    let getStartedDisabled = this.state.getStartedDisabled;
    if (this.state.show) {
      if (this.state.emailValid) getStartedDisabled = this.state.getStartedDisabled;
      else getStartedDisabled = true;
    }

    const applicant = (
      <Applicant
        container={this.applicantRef.current}
        validation={this.emailValidation()}
        textValidation={this.textValidation}
        emailValid={emailValid}
      />
    );

    const preloader = (
      <Preloader
        error={this.state.error}
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

          <Verification handler={this.handleClick} />

          <Transactions
            showEmail={this.handleEmailClick()}
            hideEmail={this.handleEmailHide()}
            applicantShown={this.state.show}
          />

          {show && applicant}
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

const mapStateToProps = (state: IProps) => state;

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
