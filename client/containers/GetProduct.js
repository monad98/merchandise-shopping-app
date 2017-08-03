import React from 'react';
import { connect } from 'react-redux';
import {getClosestOption, getLimit, getNearestStore, getOffset, getProductList, getUserInfo} from "../reducers/index";
import {changeLimit, changeOffset, fetchProducts, resetSearch, toggleClosestOption, updateLocationWithoutFetch} from "../actions/search";
import ProductFetchOptionComponent from "../components/ProductFetchOption";
import ProductListComponent from "../components/ProductList";


class GetProductContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props.resetSearch();
  }

  render() {
    const {
      limit,
      offset,
      changeOffset,
      changeLimit,
      updateLocationWithoutFetch,
      fetchProducts,
      toggleClosestOption,
      closestOption,
      products,
      nearestStore
    } = this.props;

    return (
      <div>
        <ProductFetchOptionComponent
          limit={limit} offset={offset}
          fetchProducts={fetchProducts}
          closestOption={closestOption}
          updateLocation={updateLocationWithoutFetch}
          changeOffset={changeOffset}
          changeLimit={changeLimit}
          toggleClosestOption={toggleClosestOption}
        />
        <br/>
        {!!products.length && <ProductListComponent products={products} nearestStore={nearestStore}/>}
      </div>
    )
  }
}


export default connect(
  (state) => ({
    user: getUserInfo(state),
    limit: getLimit(state),
    offset: getOffset(state),
    closestOption: getClosestOption(state),
    products: getProductList(state),
    nearestStore: getNearestStore(state)
  }),
  { changeLimit,
    changeOffset,
    resetSearch,
    updateLocationWithoutFetch,
    toggleClosestOption,
    fetchProducts
  }
)(GetProductContainer);

