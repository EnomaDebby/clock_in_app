import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';

$(document).ready(() => {
  const $routed = document.querySelector('#react-routed-component');

  if ($routed) {
    const routes = (
      <Router>
        <div>
          <Route path="/events/:id/edit" component={EditEvent} exact={true} />
        </div>
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

  const $newEventform = document.querySelector('#react-new-event-form');
  if ($newEventform) {
    const userId = $newEventform.getAttribute('userId');
    const userLoggedIn = userId ? true : false;

    ReactDOM.render(<AddEvent userLoggedIn={userLoggedIn} />, $newEventform);
  }
});
