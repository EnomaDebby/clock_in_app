import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker, FancySelect, FlashMessage } from '../common';
import Api from '../Api';
import '../style.scss';

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loggedAt: new Date(),
      eventType: { label: 'Clock In', value: 'clock_in' },
      reason: '',
      formErrors: {},
      userLoggedIn: props.userLoggedIn ? true : false,
      flashType: '',
      message: '',
      showAlert: false,
    };
  }

  onChangeEventType = selectOption => {
    this.setState({ eventType: selectOption });
  };

  onChangeLoggedAt = loggedAt => {
    this.setState({ loggedAt });
  };

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  onSubmit = () => {
    return Api.createEvent(this.state)
      .then(() => {
        window.location = '/events';
      })
      .catch(formErrors => {
        this.setState({ formErrors });

        const loginError = formErrors['login'];

        if (loginError) {
          this.showFlashMessage('error', loginError);
        }
      });
  };

  getErrorMessageFor = type => {
    const { formErrors } = this.state;
    return formErrors[type];
  };

  showFlashMessage = (flashType, message) => {
    this.setState({ showAlert: true, flashType, message });
  };

  onDismiss = () => {
    this.setState({ showAlert: false, flashType: '' });
  };

  render() {
    const {
      loggedAt,
      eventType,
      reason,
      email,
      password,
      userLoggedIn,
      showAlert,
      flashType,
      message,
    } = this.state;

    return (
      <div className="justify-content-md-center">
        {showAlert && (
          <div className="flash-message">
            <FlashMessage
              type={flashType}
              message={message}
              onDismiss={this.onDismiss}
            />
          </div>
        )}
        <div className="event-form">
          <h4>Add Time Entry</h4>

          <form>
            {!userLoggedIn && (
              <React.Fragment>
                <div className="form-group">
                  <label>
                    Email <span className="required">*</span>{' '}
                  </label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={this.handleChange.bind(this, 'email')}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={this.handleChange.bind(this, 'password')}
                  />
                </div>
              </React.Fragment>
            )}
            <div className="form-group">
              <label>
                Select Time <span className="required">*</span>
              </label>

              <DateTimePicker
                date={loggedAt}
                handleChange={this.onChangeLoggedAt}
              />
              <div className="error">
                {this.getErrorMessageFor('logged_at')}
              </div>
            </div>
            <div className="form-group">
              <label>
                Event Type <span className="required">*</span>
              </label>
              <FancySelect
                value={eventType}
                handleChange={this.onChangeEventType}
                options={[
                  {
                    label: 'Clock In',
                    value: 'clock_in',
                  },
                  { label: 'Clock Out', value: 'clock_out' },
                ]}
                placeholder="Select One"
                className=""
              />
              <div className="error">
                {this.getErrorMessageFor('event_type')}
              </div>
            </div>
            <div className="form-group">
              <label>Reason(optional)</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={reason}
                onChange={this.handleChange.bind(this, 'reason')}
              />
              <div className="error">{this.getErrorMessageFor('reason')}</div>
            </div>
            <div className="submit">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Create Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddEvent.propTypes = {
  userLoggedIn: PropTypes.bool,
};

export default AddEvent;
