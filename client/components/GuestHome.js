import React from 'react';
import { Link } from 'react-router-dom';

const GuestHomeComponent = () =>(
  <div>
    <div className="col-sm-12">
      <h2>You should login to use this service.</h2>
      <p>
        <Link className="btn btn-primary" to="/login"><i className="fa fa-sign-in"/> LOG IN</Link>
      </p>
    </div>

    <div className="text-center">
      <img src="/image/shopping-cart.png"/>
    </div>
  </div>
);

export default GuestHomeComponent;