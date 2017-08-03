import React from 'react';
import { connect } from 'react-redux';
import {getLimit, getOffset, getSearchedStoresWithName, getText, getUserInfo} from "../reducers/index";
import {changeLimit, changeOffset, changeText, resetSearch, searchStoresWithProductName} from "../actions/search";
import SearchStoresWithNameOptionComponent from "../components/SearchStoresWithNameOption";
import StoreListWithProductComponent from "../components/StoreListWithProduct";


class SearchStoreWithNameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.props.resetSearch();
  }

  render() {
    const {
      user,
      stores,
      limit,
      offset,
      searchText,
      changeOffset,
      changeLimit,
      changeText,
      searchStoresWithProductName,
    } = this.props;

    return (
      <div>
        {user &&
        <div>
          <SearchStoresWithNameOptionComponent
            search={searchStoresWithProductName}
            changeText={changeText}
            changeOffset={changeOffset}
            changeLimit={changeLimit} />
          {!!stores.length &&
          <StoreListWithProductComponent
            stores={stores}
            searchText={searchText}
            limit={limit} offset={offset}/>
          }
        </div>
        }
      </div>
    )
  }
}


export default connect(
  (state) => ({
    user: getUserInfo(state),
    stores: getSearchedStoresWithName(state),
    limit: getLimit(state),
    offset: getOffset(state),
    searchText: getText(state)
  }),
  { changeText, changeLimit, changeOffset, searchStoresWithProductName, resetSearch}
)(SearchStoreWithNameContainer);

