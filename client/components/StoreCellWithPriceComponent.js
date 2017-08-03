import React from 'react';

const StoreCellWithPriceComponent = ({store, idx}) => (
  <div className="row">
    <div className="col-md-10 col-sm-10 col-lg-10">
      <h4 className="title">
        <i className="label label-info">{idx}</i>
        {" " + store.productName}
      </h4>
      <h4>
        <a target="_black" href={'https://www.walmart.com/store/'+store.storeNo}>{"   at " + store.name}</a>
      </h4>
      <p style={{marginLeft: '10px'}}>{store.streetAddress + ', ' + store.city + ' ' + store.stateProvCode}</p>
    </div>
    <div className="col-md-2 col-sm-2 col-lg-2">
      <h4><span className="label label-lg label-danger">Price: ${store.price.toFixed(2)}</span></h4>
      <h4><span className="label label-lg label-success">Qty: {store.quantity}</span></h4>
    </div>


  </div>
);



export default StoreCellWithPriceComponent;