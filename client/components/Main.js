import React from "react";
import PropTypes from 'prop-types'
import { Route } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginContainer from '../containers/Login';
import SignupContainer from '../containers/Signup';
import HomeContainer from '../containers/Home';
import SearchNearStoreContainer from '../containers/SearchNearStore';
import SearchStoreWithNameContainer from '../containers/SearchStoreWithName';
import GetProductContainer from '../containers/GetProduct';
import { connect } from 'react-redux';
import {checkJWT} from "../actions/user";
import Notification from "../containers/Notification";

class Main extends React.Component{

  constructor(props) {
    super(props);
    props.checkJWT();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Notification />
        <div className="container main">
          <Route exact={true} path="/" component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/search_near_store" component={SearchNearStoreContainer} />
          <Route path="/search_store_by_name" component={SearchStoreWithNameContainer} />
          <Route path="/product_list" component={GetProductContainer} />
        </div>
        <Footer />
      </div>
    );
  }
}
Main.propTypes = {
  checkJWT: PropTypes.func.isRequired
};

export default connect(
  null,
  {checkJWT}
)(Main);