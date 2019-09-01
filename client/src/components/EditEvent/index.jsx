import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '../common';
import Api from '../Api';
import '../style.scss';

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedAt: new Date(),
      eventType: 'clock_in',
      reason: '',
      formErrors: {},
    };
  }

  componentDidMount() {
    const { params: { id } } = this.props.match;
    Api.getEvent(id).then(event => {
      const { logged_at, reason, event_type } = event;
      const loggedAt = logged_at ? new Date(logged_at) : logged_at;

      this.setState({
        reason,
        eventType: event_type,
        loggedAt,
      });
    });
  }

  onChangeEventType = selectOption => {
    this.setState({ eventType: selectOption });
  };

  onChangeLoggedAt = loggedAt => {
    this.setState({ loggedAt });
  };

  onChangeReason = e => {
    this.setState({ reason: e.target.value });
  };

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  onSubmit = () => {
    const { params: { id } } = this.props.match;

    return Api.updateEvent(id, this.state)
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

  render() {
    const { loggedAt, eventType, reason } = this.state;

    return (
      <div className="justify-content-md-center">
        <div className="event-form">
          <h4>Edit Time Entry</h4>
          <form>
            <div className="form-group">
              <label>Select Time</label>
              <DateTimePicker
                date={loggedAt}
                handleChange={this.onChangeLoggedAt}
              />
              <div className="error">
                {this.getErrorMessageFor('logged_at')}
              </div>
            </div>
            <div className="form-group event-type">
              <label>
                Event Type <span className="required">*</span>
              </label>
              <br />
              <div className="radio-buttons">
                <div className="custom-control-inline">
                  <input
                    type="radio"
                    id="clockIn"
                    name="clockEvent"
                    value="clock_in"
                    className=""
                    checked={eventType === 'clock_in'}
                    onChange={this.handleChange.bind(this, 'eventType')}
                  />
                  <label className="">Clock In</label>
                </div>
                <div className="custom-control-inline">
                  <input
                    type="radio"
                    id="clockOut"
                    name="clockEvent"
                    value="clock_out"
                    className=""
                    checked={eventType === 'clock_out'}
                    onChange={this.handleChange.bind(this, 'eventType')}
                  />
                  <label className="">Clock Out</label>
                </div>
              </div>
              <div className="error">
                {this.getErrorMessageFor('event_type')}
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={reason}
                onChange={this.onChangeReason}
              />
              <div className="error">{this.getErrorMessageFor('reason')}</div>
            </div>
            <div className="submit">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Update Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditEvent.propTypes = {
  match: PropTypes.bool,
};

export default EditEvent;
