import React from "react";

// Loads our component from src for easier development
import { withScroll, withWindow, WindowManager } from "../../src/index";

const BREAKPOINTS = [
  {
    name: "small",
    media: "(min-width: 0)",
  },
  {
    name: "medium",
    media: "(min-width: 600px)",
  },
  {
    name: "large",
    media: "(min-width: 1000px)",
  },
  {
    name: "xlarge",
    media: "(min-width: 1500px)",
  },
  {
    name: "xxlarge",
    media: "(min-width: 2000px)",
  },
  {
    name: "xxxlarge",
    media: "(min-width: 2800px)",
  },
];

new WindowManager(BREAKPOINTS);

class Demo extends React.Component {
  render() {
    // TODO types
    // @ts-ignore
    const { breakpoint, dimensions, isTouchDevice, orientation, scrollPositionX, scrollPositionY } = this.props;

    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Decorator</th>
              <th>Prop</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>withScroll</code>
              </td>
              <td>
                <code>scrollPositionY</code>
              </td>
              <td>{scrollPositionY}</td>
            </tr>
            <tr>
              <td>
                <code>withScroll</code>
              </td>
              <td>
                <code>scrollPositionX</code>
              </td>
              <td>{scrollPositionX}</td>
            </tr>
            <tr>
              <td>
                <code>withWindow</code>
              </td>
              <td>
                <code>dimensions</code>
              </td>
              <td>
                width: {dimensions.width}, height: {dimensions.height}
              </td>
            </tr>
            <tr>
              <td>
                <code>withWindow</code>
              </td>
              <td>
                <code>orientation</code>
              </td>
              <td>{orientation}</td>
            </tr>
            <tr>
              <td>
                <code>withWindow</code>
              </td>
              <td>
                <code>breakpoint</code>
              </td>
              <td>{breakpoint}</td>
            </tr>
            <tr>
              <td>
                <code>withWindow</code>
              </td>
              <td>
                <code>isTouchDevice</code>
              </td>
              <td>{isTouchDevice.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withWindow(withScroll(Demo));
