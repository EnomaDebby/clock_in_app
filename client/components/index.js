import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

$(document).ready(() => {
  const $routed = document.querySelector('#react-routed-component');

  if ($routed) {
    const routes = (
      <Router>
        <div />
      </Router>
    );

    const render = () => {
      ReactDOM.render(<AppContainer>{routes}</AppContainer>, $routed);
    };

    render(routes);

    if (module.hot) {
      module.hot.accept();
    }
  }
});
