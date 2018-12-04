# React Window Decorators

[![npm version](https://img.shields.io/npm/v/react-window-decorators.svg?style=flat-square)](https://www.npmjs.com/package/react-window-decorators)
[![npm downloads](https://img.shields.io/npm/dm/react-window-decorators.svg?style=flat-square)](https://www.npmjs.com/package/react-window-decorators)

Two decorators (higher order components) that inject `window` scroll position,
dimensions, orientation, breakpoint* and `isTouchDevice` to your component's props.

If you are not sure what it does, play with the
[demo](https://muffinman.io/react-window-decorators/).

All modern browsers and IE10+.

\* You need to pass breakpoint data (check below).

[Changelog](CHANGELOG.md)

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
        Vertical scroll position is: { this.props.scrollPositionY }
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
        Vertical scroll position is: { this.props.scrollPositionY }
      </div>
    );
  }
}

export default withScroll(YourComponent);
```


If you run it on the server, `withScroll` will return `0` as the initial value.

### `withWindow` decorator

`withWindow` internally uses `WindowManager` for tracking resize events.
If you want to use breakpoints feature you need to set it by creating new `WindowManager`
and passing it array with breakpoints data. Each breakpoint object must contain
a name and media query which will be passed to
[matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

Second argument is `debounceTime` which determines resize event's debounce time.
Default is `250`.

`WindowManager` is a singleton, so this should be done only once *before* using decorator.

```js
import { WindowManager } from 'react-window-decorators';

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

// Set breakpoints data
// Somewhere in your application bootstrap
new WindowManager(BREAKPOINTS);
```

If you don't pass breakpoints data, `breakpoint` prop will always be null.

Using decorator syntax (my preferred way).

```js
import { withWindow } from 'react-window-decorators';

@withWindow
export default class YourComponent extends Component {
  render() {
    return (
      <div>
        <div>Window dimensions are: { this.props.dimensions.width }/{ this.props.dimensions.height }</div>
        <div>Window orientation is: { this.props.orientation }</div>
        <div>Window breakpoint is: { this.props.breakpoint }</div>
        <div>Device is touch enabled: { this.props.isTouchDevice.toString() }</div>
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
        <div>Device is touch enabled: { this.props.isTouchDevice.toString() }</div>
      </div>
    );
  }
}

export default withWindow(YourComponent);
```

If you run it on the server, `withWindow` will return these initial values

```js
{
  dimensions: {
    width: 0,
    height: 0,
  },
  breakpoint: null,
  orientation: null,
  isTouchDevice: false,
};
```

## Chaining Decorators

```js
@withWindow
@withScroll
export default class YourComponent extends Component {
  ...
}
```

or

```js
class YourComponent extends Component {
  ...
}

export default withWindow(withScroll(Demo));
```

## License

Released under [MIT License](LICENSE.md).
