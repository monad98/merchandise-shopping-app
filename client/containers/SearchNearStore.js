import React from 'react';
import { connect } from 'react-redux';
import SearchNearStoreComponent from '../components/SearchNearStore';
import {getDistance, getLocationFormat, getSearchedNearStores, getSelectedCoordinates, getUserInfo} from "../reducers/index";
import {changeDistance, changeLocationFormat, resetSearch, updateSelectedLocation} from "../actions/search";
import StoreListComponent from "../components/StoreList";


class SearchNearStoreContainer extends React.Component {
  constructor(props) {
    super(props);
    if(props.user) this.props.resetSearch();
  }

  render() {
    const {
      user,
      stores,
      lnglat,
      distOption,
      locFormat,
      updateSelectedLocation,
      changeDistance,
      changeLocationFormat
    } = this.props;

    const center = new google.maps.LatLng(lnglat.lat, lnglat.lng);
    const markers = [{
      position: center,
      defaultAnimation: 2,
      key: Date.now()
    }];

    const arrows = stores.map((store, idx) => ({
      position: new google.maps.LatLng(store.loc.coordinates[1], store.loc.coordinates[0]),
      defaultAnimation: 2,
      key: idx,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5
      },
      label: {
        text: store.name,
        color: 'blue',
        fontWeight: 'bold'
      }
    }));

    return (
      <div>
        {user &&
        <div>
          <SearchNearStoreComponent stores={stores} arrows={arrows} center={center} markers={markers}
                                    distOption={distOption} locFormat={locFormat}
                                    updateLocation={updateSelectedLocation} changeDistance={changeDistance}
                                    changeLocationFormat={changeLocationFormat}
          />
          {!!stores.length &&
          <StoreListComponent stores={stores} />}
        </div>
        }
      </div>
    )
  }
}


export default connect(
  (state) => ({
    user: getUserInfo(state),
    lnglat: getSelectedCoordinates(state),
    stores: getSearchedNearStores(state),
    distOption: getDistance(state),
    locFormat: getLocationFormat(state)
  }),
  { updateSelectedLocation, changeDistance, changeLocationFormat, resetSearch }
)(SearchNearStoreContainer);

