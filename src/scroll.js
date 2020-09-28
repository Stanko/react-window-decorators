import React, { Component } from 'react';
import ScrollManager from 'window-scroll-manager';

const withScroll = ComposedComponent => class ScrollDecorator extends Component {
  constructor() {
    super();

    let scrollPositionX = 0;
    let scrollPositionY = 0;

    // Check for universal rendering
    if (typeof window !== 'undefined') {
      this.scrollManager = new ScrollManager();

      // Initial scroll position
      scrollPositionX = this.scrollManager.getScrollPosition().scrollPositionX;
      scrollPositionY = this.scrollManager.getScrollPosition().scrollPositionY;

      this.handleScrollChange = this.handleScrollChange.bind(this);
    }

    this.state = {
      scrollPositionX,
      scrollPositionY,
      // Alias for scrollPositionY for backwards compatibility
      scrollPosition: scrollPositionY,
    };
  }

  componentDidMount() {
    // Bind events
    window.addEventListener('window-scroll', this.handleScrollChange);
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    window.removeEventListener('window-scroll', this.handleScrollChange);

    this.scrollManager.removeListener();
    this.scrollManager = null;
  }

  handleScrollChange(e) {
    const {
      scrollPositionY,
      scrollPositionX,
    } = this.state;
    const newScrollPositionY = e.detail.scrollPositionY;
    const newScrollPositionX = e.detail.scrollPositionX;

    // Update the state only when scroll position is changed
    if (newScrollPositionY !== scrollPositionY || newScrollPositionX !== scrollPositionX) {
      requestAnimationFrame(() => {
        this.setState({
          scrollPositionX: newScrollPositionX,
          scrollPositionY: newScrollPositionY,
          // Alias for scrollPositionY for backwards compatibility
          scrollPosition: newScrollPositionY,
        });
      });
    }
  }

  render() {
    const {
      scrollPositionX,
      scrollPositionY,
    } = this.state;

    return (
      <ComposedComponent
        { ...this.props }
        scrollPositionX={ scrollPositionX }
        scrollPositionY={ scrollPositionY }
        // Alias for scrollPositionY for backwards compatibility
        scrollPosition={ scrollPositionY }
      />
    );
  }
};

export default withScroll;
