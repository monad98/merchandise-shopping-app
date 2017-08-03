import { connect } from 'react-redux';
import React from 'react';
import SignupComponent from '../components/Signup';
import {getNotification, getUserInfo} from "../reducers/index";
import {signup} from "../actions/user";

class SignupContainer extends React.Component {

  render() {
    const {user, msg, signup} = this.props;
    const handleSubmit = function (ev) {
      ev.preventDefault();
      signup({email: this.emailInput.value, password: this.passwordInput.value});
    };
    return (
      <div>
        {!msg && <SignupComponent handleSubmit={handleSubmit}/>}
        <br/>
        {msg &&
        <h3 className="text-center">{msg.text}</h3>
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    user: getUserInfo(state),
    msg: getNotification(state)
  }),
  { signup }
)(SignupContainer);

