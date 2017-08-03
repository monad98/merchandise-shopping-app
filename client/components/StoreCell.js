import React from 'react';
import PropTypes from 'prop-types';

const StoreCellComponent = ({store, idx}) => (
  <div className="row">
    <div className="col-md-10 col-sm-10 col-lg-10">
      <h3 className="title">
        <i className="label label-info">{idx}</i>
        <a target="_black" href={'https://www.walmart.com/store/'+store.storeNo}>{" " + store.name}</a>
      </h3>
      <p style={{marginLeft: '10px'}}>{store.streetAddress + ', ' + store.city + ' ' + store.stateProvCode}</p>
      <p style={{marginLeft: '10px'}}>{store.phoneNumber}</p>
    </div>
    <div className="col-md-2 col-sm-2 col-lg-2">
      <h3><span className="label label-lg label-success">~{store.distance.toFixed(1)} miles</span></h3>
    </div>
  </div>
);

StoreCellComponent.propTypes = {
  idx: PropTypes.number.isRequired,
  store: PropTypes.shape({
    name: PropTypes.string.isRequired,
    streetAddress: PropTypes.string.isRequired,
    stateProvCode: PropTypes.string,
    city: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};


export default StoreCellComponent;