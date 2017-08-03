import React from 'react';
import PropTypes from 'prop-types'

const Notification = ({msg}) => (
  <div className="notification">
    {msg && <div className="alert alert-success" role="alert"><strong>{msg.text}</strong></div>}
  </div>
);

Notification.PropTypes = {
  msg: PropTypes.object
};

export default Notification;