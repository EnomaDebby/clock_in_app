import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker, FancySelect } from '../common';
import Api from '../Api';
import '../style.scss';

class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedAt: new Date(),
      eventType: { label: 'Clock In', value: 'clock_in' },
      reason: '',
      formErrors: {},
    };
  }

  componentDidMount() {
    const { params: { id } } = this.props.match;
    Api.getEvent(id).then(event => {
      const { logged_at, reason, event_type } = event;
      const loggedAt = logged_at ? new Date(logged_at) : logged_at;
      const eventLabel = event_type === 'clock_in' ? 'Clock In' : 'Clock Out';

      this.setState({
        reason,
        eventType: { label: eventLabel, value: event_type },
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
            <div className="form-group">
              <label>Event Type</label>
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
