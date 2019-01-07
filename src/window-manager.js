import isTouchDevice from 'is-touch-device';

const EVENT_NAME = 'window-resize';

let instance = null;
let instancesCount = 0;

const orientations = {
  LANDSCAPE: '(orientation: landscape)',
  PORTRAIT: '(orientation: portrait)',
};

const IS_TOUCH_DEVICE = isTouchDevice();

const isWindowDefined = typeof window !== 'undefined';

// ------------------------------------------------
// Custom Event detection
// ------------------------------------------------
const supportsCustomEvents = isWindowDefined && typeof window.CustomEvent === 'function';

// ------------------------------------------------
// Window Manager
// ------------------------------------------------
export default class WindowManager {
  constructor(breakpoints, debounceTime = 250) {
    if (!isWindowDefined) {
      // Silently return null if it is used on server
      return null;
    }

    // Increase reference count
    instancesCount++;

    // Save or update options
    this.breakpoints = breakpoints;
    this.debounceTime = debounceTime;

    // If singleton instance exists, return it rather than creating a new one
    if (instance) {
      return instance;
    }

    // Save singleton instance
    instance = this;

    // Bind handlers
    this.handleResize = this.handleResize.bind(this);

    // Add resize listener
    window.addEventListener('resize', this.handleResize);
  }

  removeListener() {
    instancesCount--;

    if (instancesCount === 0) {
      // Clear singleton instance
      instance = null;
      // Remove listeners
      window.removeEventListener('resize', this.handleResize);
    }
  }

  getDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  getOrientation() {
    return window.matchMedia(orientations.LANDSCAPE).matches ?
      'landscape' :
      'portrait';
  }

  getBreakpoint() {
    let breakpoint = null;

    if (this.breakpoints) {
      for (let i = 0; i < this.breakpoints.length; i++) {
        if (window.matchMedia(this.breakpoints[i].media).matches) {
          breakpoint = this.breakpoints[i].name;
        }
      }
    }

    return breakpoint;
  }

  isTouchDevice() {
    return IS_TOUCH_DEVICE;
  }

  handleResize() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      let event;

      const detail = {
        breakpoint: this.getBreakpoint(),
        dimensions: this.getDimensions(),
        orientation: this.getOrientation(),
      };

      if (supportsCustomEvents) {
        event = new CustomEvent(EVENT_NAME, { detail });
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(EVENT_NAME, false, false, detail);
      }

      // Dispatch the event.
      window.dispatchEvent(event);
    }, this.debounceTime);
  }
}
