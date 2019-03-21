import * as React from 'react';

import './styles/slider.sass';

interface ISlider {
  speed: number;
  pause: boolean;
  pagination: boolean;
  animation: boolean;
}

interface ISliderState {
  current: number;
}

export default class Slider extends React.Component<ISlider, ISliderState> {
  speed: number;
  pause: boolean;
  pagination: boolean;
  fadeAppear: boolean;
  timeout: NodeJS.Timeout;
  startPoint: number;

  constructor(props: ISlider) {
    super(props);
    this.speed = props.speed || 3000;
    this.pause = props.pause;
    this.pagination = props.pagination;
    this.fadeAppear = props.animation;

    this.state = {
      current: 0,
    };
  }

  handleStopEvent() {
    const stopEvent = (e: React.TouchEvent<HTMLButtonElement>) => e.stopPropagation();

    return stopEvent;
  }

  stopClickEvent() {
    const stopEvent = (e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation();

    return stopEvent;
  }

  createPagination() {
    if (this.pagination) {
      const buttons = [];
      const classNames = require('classnames/bind');

      for (let i = 0; i < React.Children.count(this.props.children); i += 1) {
        let classButton = classNames({ pagination: true, activeButton: false });
        if (i === this.state.current) {
          classButton = classNames({ pagination: true, activeButton: true });
        } else {
          classButton = classNames({ pagination: true, activeButton: false });
        }

        const onPaginationClick = (e: React.MouseEvent<HTMLElement>) => {
          this.setState({ current: i });
          clearInterval(this.timeout);
        };

        buttons.push(
          <button
            className={classButton}
            key={i}
            onClick={onPaginationClick}
            onMouseDown={this.stopClickEvent}
            onTouchStart={this.handleStopEvent}
            onTouchEnd={this.handleStopEvent}
          />);
      }

      return (
        <div className="controlBar">
          {buttons}
        </div>
      );
    }

    return null;
  }

  moveForward() {
    this.state.current + 1 < React.Children.count(this.props.children) ?
      this.setState({
        current: this.state.current + 1,
      }) :
      this.setState({
        current: 0,
      });
  }

  moveBackward() {
    this.state.current - 1 >= 0 ?
      this.setState({
        current: this.state.current - 1,
      }) :
      this.setState({
        current: React.Children.count(this.props.children) - 1,
      });
  }

  autoplay() {
    this.timeout = setTimeout(() => this.moveForward(), this.speed);
  }

  animate(index: number) {
    if (index === this.state.current) {
      if (this.fadeAppear) return 'fade-current';

      return 'active';
    }

    return 'slide';
  }

  handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    this.startPoint = event.changedTouches[0].clientX;
  }

  handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {

    const end = event.changedTouches[0].clientX;

    clearInterval(this.timeout);
    if (this.startPoint - 100 >= end || this.startPoint === end) {
      this.moveForward();
    } else if (this.startPoint + 100 <= end) {
      this.moveBackward();
    }
  }

  getSlides() {
    const slides = React.Children.map(this.props.children, (child: JSX.Element, index: number) =>
      React.cloneElement(child, {
        key: index,
        className: `${this.animate(index)}`,
      }));

    return (
      <div
        id="slider"
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {slides}
        {this.createPagination()}
      </div>
    );
  }

  render() {
    if (!this.pause) {
      clearInterval(this.timeout);
      this.autoplay();
    }

    return (
      this.getSlides()
    );
  }
}
