import React from 'react';
import PropTypes from 'prop-types'

class SignupComponent extends React.Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <div className="page-header text-center">
          <h3>Create Account</h3>
        </div>
        <form className="form-horizontal" onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">Email</label>
            <div className="col-sm-7">
              <input type="email" name="email" id="email"
                     placeholder="Email" autoFocus="autofocus"
                     required="required" className="form-control"
                     ref={(ref) => this.emailInput = ref} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-7">
              <input type="password" name="password" id="password"
                     placeholder="Password" required="required"
                     className="form-control"
                     ref={(ref) => this.passwordInput = ref} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3 control-label">Confirm Password</label>
            <div className="col-sm-7">
              <input type="password" name="password" id="password" placeholder="Password" required="required" className="form-control"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
              <button type="submit" className="col-sm-3 btn btn-primary"><i className="fa fa-user"/> Create Account</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SignupComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default SignupComponent;