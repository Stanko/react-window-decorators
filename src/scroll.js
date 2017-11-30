import React, { Component } from 'react';
import ScrollManager from 'window-scroll-manager';

const withScroll = ComposedComponent => class ScrollDecorator extends Component {
  constructor() {
    super();

    let scrollPosition = 0;

    // Check for universal rendering
    if (typeof window !== 'undefined') {
      this.scrollManager = new ScrollManager();

      // Initial scroll position
      scrollPosition = this.scrollManager.getScrollPosition();

      // Bind events
      this.handleScrollChange = this.handleScrollChange.bind(this);
      window.addEventListener('window-scroll', this.handleScrollChange);
    }

    this.state = {
      scrollPosition,
    };
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    window.removeEventListener('window-scroll', this.handleScrollChange);

    this.scrollManager.removeListener();
    this.scrollManager = null;
  }

  handleScrollChange(e) {
    const { scrollPosition } = this.state;
    const newScrollPosition = e.detail.scrollPosition;

    // Update the state only when scroll position is changed
    if (newScrollPosition !== scrollPosition) {
      requestAnimationFrame(() => {
        this.setState({
          scrollPosition: newScrollPosition,
        });
      });
    }
  }

  render() {
    const { scrollPosition } = this.state;

    return (
      <ComposedComponent
        { ...this.props }
        scrollPosition={ scrollPosition }
      />
    );
  }
};

export default withScroll;
