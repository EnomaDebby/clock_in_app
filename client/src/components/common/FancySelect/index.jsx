import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FancySelect = ({ value, handleChange, options, placeholder }) => {
  return (
    <Select
      name="form-field-name"
      value={value}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
    />
  );
};

FancySelect.propTypes = {
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  handleChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default FancySelect;
