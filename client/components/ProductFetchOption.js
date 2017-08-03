import React from 'react';
import Geosuggest from "react-geosuggest";

const ProductFetchOptionComponent = ({
                                       toggleClosestOption,
                                       changeOffset,
                                       changeLimit,
                                       updateLocation,
                                       fetchProducts,
                                       closestOption,
                                       limit,
                                       offset
                                     }) => (
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="radio">
        <label>
          <input type="radio" name="closestOption" id="optionsRadios1"
                 value='all' checked={closestOption === 'all'} onChange={toggleClosestOption}/>
          Product List of All stores
        </label>
      </div>
      <div className="radio">
        <label>
          <input type="radio" name="closestOption" id="optionsRadios2" value="nearest"
                 checked={closestOption === 'nearest'} onChange={toggleClosestOption}/>
          Product List of the nearest store
        </label>
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
        {[0,10,20,50,100,150,200,300,400,500].map((l, idx) => (<option key={idx} value={l}>{l}</option> ))}
      </select>
    </div>
    {closestOption === 'nearest' &&
    <div className="col-lg-12 col-md-12 col-sm-12">
      <h5>Your Location</h5>
      <Geosuggest
        placeholder="Enter address"
        initialValue="San Diego, CA, United States"
        onSuggestSelect={updateLocation}
        queryDelay={150}
        country="us"
      />
    </div>
    }
    <div className="col-lg-12 col-md-12 col-sm-12">
      <br/>
      <button className="btn btn-block btn-warning" onClick={fetchProducts}>Get Products</button>
    </div>
  </div>
);


export default ProductFetchOptionComponent;