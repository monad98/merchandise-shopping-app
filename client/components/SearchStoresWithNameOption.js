import React from 'react';

const SearchStoresWithNameOptionComponent = ({changeText, changeOffset, changeLimit, search}) => (
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" className="form-control" placeholder="Product Name" onChange={changeText}/>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6">
      <label>Limit</label>
      <select className="form-control" defaultValue='20' onChange={changeLimit}>
        {[5,10,20,50].map((l, idx) => (<option key={idx} value={l}>{l}</option> ))}
      </select>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6">
      <label>Offset</label>
      <select className="form-control" defaultValue='0' onChange={changeOffset}>
        {[0,10,20,50].map((l, idx) => (<option key={idx} value={l}>{l}</option> ))}
      </select>
    </div>
    <div className="col-lg-12 col-md-12 col-sm-12">
      <br/>
      <button className="btn btn-block btn-primary" onClick={search}>Search</button>
    </div>
  </div>
);


export default SearchStoresWithNameOptionComponent;