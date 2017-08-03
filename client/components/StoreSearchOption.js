import React from 'react';

const StoreSearchOptionComponent = ({distOption, locFormat, changeDistance, changeLocationFormat}) => (
  <div className="row">
    <div className="col-lg-6 col-md-6 col-sm-6">
      <label>Search Method</label>
      <select className="form-control" defaultValue='coordinates' onChange={changeLocationFormat}>
        <option value="coordinates">Search with coordinates</option>
        <option value="address">Search with address</option>
      </select>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6">
      <label>Search Radius (Miles)</label>
      <select className="form-control" defaultValue='20' onChange={changeDistance}>
        {[5,10,20,50,100].map((l, idx) => (<option key={idx} value={l}>{l} Miles</option> ))}
      </select>
    </div>
  </div>
);


export default StoreSearchOptionComponent;