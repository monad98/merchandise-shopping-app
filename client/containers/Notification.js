import { connect } from 'react-redux'
import React from 'react'
import Notification from "../components/Notification";
import {getNotification} from "../reducers/index";

export default connect(
  state => ({ msg: getNotification(state) })
)(Notification);