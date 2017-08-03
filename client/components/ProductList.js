import React from 'react';
import ProductCellComponent from './ProductCell';

const ProductListComponent = ({products, nearestStore}) => (
  <div className="panel panel-danger">
    <div className="panel-heading">
      <h3 className="panel-title"> Products List Sorted By Price (from the lowest)</h3>
    </div>
    <div className="panel-body">
      {products.map((product, idx) =>
        (
          <div key={idx} className="row">
            <div className="col-sm-10 col-lg-10 col-md-10">
              <ProductCellComponent idx={idx+1} product={product} nearestStore={nearestStore}/>
            </div>
          </div>
        )
      )}
    </div>
  </div>

);

export default ProductListComponent;