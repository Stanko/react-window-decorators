const EVENT_NAME = 'window-resize';

let instance = null;
let instancesCount = 0;

const orientations = {
  LANDSCAPE: '(orientation: landscape)',
  PORTRAIT: '(orientation: portrait)',
};

// CustomEvent polyfill
if (typeof window !== 'undefined' && typeof window.CustomEvent !== 'function') {
  const CustomEventPollyfill = function (
    event,
    userParams
  ) {
    const params = userParams || {};
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles || false, params.cancelable || false, params.detail || undefined);
    return evt;
  };

  CustomEventPollyfill.prototype = window.Event.prototype;

  window.CustomEvent = CustomEventPollyfill;
}

export default class WindowManager {
  constructor(breakpoints, debounceTime) {
    if (typeof window === 'undefined') {
      // Silently return null if it is used on server
      return null;
    }

    instancesCount++;

    if (instance) {
      return instance;
    }

    instance = this;

    // Bind handlers
    this.handleResize = this.handleResize.bind(this);

    this.breakpoints = breakpoints;
    this.debounceTime = debounceTime;

    window.addEventListener('resize', this.handleResize);
  }

  removeListener() {
    instancesCount--;

    if (instancesCount === 0) {
      // Clear sinfleton instance
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
    if (!this.breakpoints) {
      return null;
    }

    let breakpoint = null;

    for (let i = 0; i < this.breakpoints.length; i++) {
      if (window.matchMedia(this.breakpoints[i].media).matches) {
        breakpoint = this.breakpoints[i].name;
      }
    }

    return breakpoint;
  }

  handleResize() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      const event = new CustomEvent(EVENT_NAME, {
        detail: {
          breakpoint: this.getBreakpoint(),
          dimensions: this.getDimensions(),
          orientation: this.getOrientation(),
        },
      });

      // Dispatch the event.
      window.dispatchEvent(event);
    }, this.debounceTime);
  }
}
