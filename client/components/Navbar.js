import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getUserInfo} from "../reducers/index";
import {logout} from "../actions/user";

const Navbar = ({user, logout, path}) => (
<nav className="navbar navbar-default navbar-fixed-top">
  <div className="container">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/"><i className="fa fa-shopping-cart"/> Merchandise Shopping App</Link>
    </div>
    <div id="navbar" className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        {user && <li><NavLink to="/search_near_store" className={path === '/search_near_store' ? 'active':''}>Search Near Store</NavLink></li>}
        {user && <li><NavLink to="/search_store_by_name" className={path === '/search_store_by_name' ? 'active':''}>Search Store by Product</NavLink></li>}
        {user && <li><NavLink to="/product_list" className={path === '/product_list' ? 'active':''}>Product List</NavLink></li>}
      </ul>
      <ul className="nav navbar-nav navbar-right">
        {!user && <li><NavLink to="/login" activeClassName='active'>Login</NavLink></li>}
        {!user && <li><NavLink to="/signup" activeClassName='active'>Sign up</NavLink></li>}
        {user && <li><a onClick={logout} style={{cursor: 'pointer'}}>Log out</a></li>}
      </ul>
    </div>
  </div>
</nav>
);

Navbar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  path: PropTypes.string
};

//
export default connect(
  (state) => ({user: getUserInfo(state), path: state.routing.location.pathname }),
  {logout}
)(Navbar);