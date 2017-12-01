import React from 'react';
import PropTypes from 'prop-types';

// Loads our component from src for easier development
import { withScroll, withWindow, WindowManager } from '../../../src/index';


const BREAKPOINTS = [
  {
    name: 'small',
    media: '(min-width: 0)',
  },
  {
    name: 'medium',
    media: '(min-width: 600px)',
  },
  {
    name: 'large',
    media: '(min-width: 1000px)',
  },
  {
    name: 'xlarge',
    media: '(min-width: 1500px)',
  },
  {
    name: 'xxlarge',
    media: '(min-width: 2000px)',
  },
  {
    name: 'xxxlarge',
    media: '(min-width: 2800px)',
  },
];

new WindowManager(BREAKPOINTS);

class Demo extends React.Component {
  render() {
    const {
      scrollPosition,
      breakpoint,
      orientation,
      dimensions,
    } = this.props;

    return (
      <div>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Decorator</th>
              <th>Prop</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>withScroll</code></td>
              <td><code>scrollPosition</code></td>
              <td>{ scrollPosition }</td>
            </tr>
            <tr>
              <td><code>withWindow</code></td>
              <td><code>dimensions</code></td>
              <td>width: { dimensions.width }, height: { dimensions.height }</td>
            </tr>
            <tr>
              <td><code>withWindow</code></td>
              <td><code>orientation</code></td>
              <td>{ orientation }</td>
            </tr>
            <tr>
              <td><code>withWindow</code></td>
              <td><code>breakpoint</code></td>
              <td>{ breakpoint }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Demo.propTypes = {
  scrollPosition: PropTypes.number.isRequired,
  breakpoint: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
  dimensions: PropTypes.object.isRequired,
};

export default withWindow(withScroll(Demo));
