import React from 'react';

const ProductCellComponent = ({product, idx, nearestStore}) => (
  <div className="row">
    <div className="media">
      <div className="media-left">
        <a href={product.url} target="_blank">
          <img style={{padding: '20px'}} className="media-object" src={product.images.thumbnailUrl} alt="Product Img" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          <a href={product.url} target="_blank">
            {product.name}
          </a>
        </h4>
        {product.store &&
          <h4 className="text-success"> @ {product.store.name} {product.distance ? '('+product.distance + ' miles away)': ''} </h4>
        }
        {product.store &&
          <p style={{marginLeft: '10px'}}>
            {product.store.streetAddress + ', ' + product.store.city + ' ' + product.store.stateProvCode}
          </p>
        }
        {nearestStore &&
          <h4> @ {nearestStore.name} ({nearestStore.distance.toFixed(2)}) miles away</h4>
        }
        {nearestStore &&
          <p style={{marginLeft: '10px'}}>
          {nearestStore.streetAddress + ', ' + nearestStore.city + ' ' + nearestStore.stateProvCode}
          </p>
        }
        <h5 style={{fontStyle: 'italic'}}>{product.department}</h5>
        <h4>
          <span className="label label-info">Price</span> ${product.price}
          <span style={{marginLeft: '30px'}} className="label label-info">In Stock</span> {product.quantity}
          </h4>
        <h4>
          <span className="label label-info">#SKU</span> {product.sku}
          <span style={{marginLeft: '30px'}} className="label label-info">#UPC</span> {product.upc}
          </h4>
      </div>
    </div>
  </div>
);


export default ProductCellComponent;