# React Window Decorators

[![npm version](https://img.shields.io/npm/v/react-window-decorators.svg?style=flat-square)](https://www.npmjs.com/package/react-window-decorators)
[![npm downloads](https://img.shields.io/npm/dm/react-window-decorators.svg?style=flat-square)](https://www.npmjs.com/package/react-window-decorators)

Two decorators (higher order components) that inject `window` scroll position,
dimensions, orientation and breakpoint* to your component's props.

If you are not sure what it does, play with the
[demo](https://stanko.github.io/react-window-decorators/).

All modern browsers and IE10+.

\* You need to pass breakpoint data (check below).

## Usage

Library is made as ES module, and you should use it with a module bundler (tested with webpack).

### `withScroll` decorator

Using decorator syntax (my preferred way).

```js
import { withScroll } from 'react-window-decorators';

@withScroll
export default class YourComponent extends Component {
  render() {
    return (
      <div>
        Scroll position is: { this.props.scrollPosition }
      </div>
    );
  }
}
```

Or without decorator syntax

```js
import { withScroll } from 'react-window-decorators';

class YourComponent extends Component {
  render() {
    return (
      <div>
        Scroll position is: { this.props.scrollPosition }
      </div>
    );
  }
}

export default withScroll(YourComponent);
```

### `withWindow` decorator

Accepts optional array with breakpoints data. Each breakpoint object must contain
a name and media query which will be passed to
[matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

Second argument is `debounceTime` which determines resize event's debounce time.
Default is `250`.

```js
// Example breakpoints data
const BREAKPOINTS = [
  {
    name: 'small',
    media: '(min-width: 0)',
  },
  {
    name: 'medium',
    media: '(min-width: 600px)',
  },
];
```

If you don't pass breakpoints data, `breakpoint` prop will always be null.

Using decorator syntax (my preferred way).

```js
import { withWindow } from 'react-window-decorators';

@withWindow(BREAKPOINTS)
export default class YourComponent extends Component {
  render() {
    return (
      <div>
        <div>Window dimensions are: { this.props.dimensions.width }/{ this.props.dimensions.height }</div>
        <div>Window orientation is: { this.props.orientation }</div>
        <div>Window breakpoint is: { this.props.breakpoint }</div>
      </div>
    );
  }
}
```

Or without decorator syntax

```js
import { withWindow } from 'react-window-decorators';

class YourComponent extends Component {
  render() {
    return (
      <div>
        <div>Window dimensions are: { this.props.dimensions.width }/{ this.props.dimensions.height }</div>
        <div>Window orientation is: { this.props.orientation }</div>
        <div>Window breakpoint is: { this.props.breakpoint }</div>
      </div>
    );
  }
}

export default withWindow(BREAKPOINTS)(YourComponent);
```

Released under [MIT License](LICENSE.md).
