import { connect } from 'react-redux';
import LoginComponent from '../components/Login';
import {login} from "../actions/user";
import React from 'react';
import {getUserInfo} from "../reducers/index";

class LoginContainer extends React.Component {

  render() {
    const {user, login} = this.props;
    const handleSubmit = function(ev) {
      ev.preventDefault();
      login({email: this.emailInput.value, password: this.passwordInput.value});
    };
    return (
      <div>
        {!user && <LoginComponent handleSubmit={handleSubmit}/>}
        {user &&
          <h3>You are already logged in as {user.email}.</h3>
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({user: getUserInfo(state)}),
  { login }
)(LoginContainer);

