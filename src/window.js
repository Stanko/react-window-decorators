import React, { Component } from 'react';
import WindowManager from './window-manager';

const withWindow = (ComposedComponent) => class WindowDecorator extends Component {
  constructor() {
    super();

    const state = {
      dimensions: {
        width: 0,
        height: 0,
      },
      breakpoint: null,
      orientation: null,
      isTouchDevice: false,
    };

    // Check for universal rendering
    if (typeof window !== 'undefined') {
      this.windowManager = new WindowManager();

      // Initial state
      state.breakpoint = this.windowManager.getBreakpoint();
      state.dimensions = this.windowManager.getDimensions();
      state.orientation = this.windowManager.getOrientation();
      state.isTouchDevice = this.windowManager.isTouchDevice();

      // Bind events
      this.handleWindowResize = this.handleWindowResize.bind(this);
      window.addEventListener('window-resize', this.handleWindowResize);
    }

    this.state = state;
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    cancelAnimationFrame(this.animationFrameRef);
    window.removeEventListener('window-resize', this.handleWindowResize);
    this.windowManager.removeListener();
    this.windowManager = null;
  }

  handleWindowResize(e) {
    const {
      breakpoint,
      dimensions,
      orientation,
    } = this.state;

    const newBreakpoint = e.detail.breakpoint;
    const newDimensions = e.detail.dimensions;
    const newOrientation = e.detail.orientation;

    // Update the state only when data has changed
    if (
      newOrientation !== orientation ||
      newBreakpoint !== breakpoint ||
      newDimensions.width !== dimensions.width ||
      newDimensions.height !== dimensions.height
    ) {
      cancelAnimationFrame(this.animationFrameRef);
      this.animationFrameRef = requestAnimationFrame(() => {
        this.setState({
          breakpoint: newBreakpoint,
          dimensions: newDimensions,
          orientation: newOrientation,
        });
      });
    }
  }

  render() {
    const {
      breakpoint,
      dimensions,
      orientation,
      isTouchDevice,
    } = this.state;

    return (
      <ComposedComponent
        { ...this.props }
        breakpoint={ breakpoint }
        dimensions={ dimensions }
        orientation={ orientation }
        isTouchDevice={ isTouchDevice }
      />
    );
  }
};

export default withWindow;
