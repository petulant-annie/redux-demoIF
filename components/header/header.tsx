import * as React from 'react';
import './styles/header.sass';

import logo from '../../assets/images/logo-if.svg';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
    );
  }
}
