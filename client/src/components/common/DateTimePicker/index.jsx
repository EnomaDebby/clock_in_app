import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

const DateTimePicker = ({ date, handleChange }) => (
  <DatePicker
    className="form-control"
    selected={date}
    onChange={handleChange}
    showTimeSelect
    timeIntervals={1}
    timeCaption="time"
    dateFormat="MMMM d, yyyy h:mm aa"
  />
);

DateTimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func,
};

export default DateTimePicker;
