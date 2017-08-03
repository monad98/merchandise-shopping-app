import React from 'react';
import StoreCellWithPriceComponent from "./StoreCellWithPriceComponent";

const StoreListWithProductComponent = ({stores, searchText, limit, offset}) => (
  <div>
    <h2>Search Results: "{searchText}"</h2>
    <h4>with limit: {limit}, offset: {offset}</h4>
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">These products are sorted by relevance (text search score)</h3>
      </div>
      <div className="panel-body">
        {stores.map((store, idx) =>
          (
            <div key={idx} className="row">
              <div className="col-sm-10 col-lg-10 col-md-10">
                <StoreCellWithPriceComponent idx={idx+1} store={Object.assign(store.storeInfo[0], {productName: store.name, price:store.price, quantity: store.quantity, score: store.score})}/>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>

);


export default StoreListWithProductComponent;