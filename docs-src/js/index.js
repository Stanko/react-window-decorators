import React from 'react';
import ReactDOM from 'react-dom';

import Demo from 'components/Demo';

import 'scss/index.scss';


const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('demo')
  );
};

render(Demo);


if (module.hot) {
  module.hot.accept('./components/Demo', () => {
    const DemoHot = require('./components/Demo').default; // eslint-disable-line global-require

    render(DemoHot);
  });

  // Loads index.html so we can hot reload it
  require('../index.html'); // eslint-disable-line global-require

  module.hot.accept('../index.html', () => {
    window.reload();
  });
}
