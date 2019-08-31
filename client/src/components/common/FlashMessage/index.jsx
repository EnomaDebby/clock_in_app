import React from 'react';
import PropTypes from 'prop-types';

const FlashMessage = ({ type, message, className, onDismiss, children }) => {
  const alertType = type === 'success' ? 'alert-success' : 'alert-danger';

  return (
    <div className="">
      <div className={`alert ${alertType} fade in ${className}`}>
        <button className="close" onClick={onDismiss}>
          ×
        </button>
        {message}
        {children}
      </div>
    </div>
  );
};

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
  onDismiss: PropTypes.func,
  children: PropTypes.node,
};

export default FlashMessage;
