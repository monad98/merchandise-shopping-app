import React from 'react';
import { Link } from 'react-router-dom'

const SelectSearchComponent = ({store, idx}) => (
    <div className="row">
      <br/>
      <h2 className="page-header">Pick one of search methods</h2>
      <br/>
      <div className="col-md-4 col-sm-4 col-xs-12 col-lg-4">
        <Link className="btn btn-lg btn-primary btn-space" to='/search_near_store'>SEARCH NEAR STORES</Link>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-12 col-lg-4">
        <Link className="btn btn-lg btn-primary btn-space" to='/search_store_by_name'>SEARCH STORE BY PRODUCT</Link>
      </div>
      <div className="col-md-4 col-sm-4 col-xs-12 col-lg-4">
        <Link className="btn btn-lg btn-primary btn-space" to='/product'>PRODUCT LIST</Link>
      </div>

    </div>
);


export default SelectSearchComponent;