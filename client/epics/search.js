import { ajax } from 'rxjs/observable/dom/ajax';
import * as fromSearch from '../actions/search';
import * as fromUser from '../actions/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {getDistance, getJWT, getLocationFormat, getSelectedAddress, getSelectedCoordinates} from "../reducers/index";

export const triggerSearchNearStores = (action$, store) =>
  action$.ofType(fromUser.LOAD_USER_INFO, fromSearch.UPDATE_SELECTED_LOCATION, fromSearch.CHANGE_DISTANCE, fromSearch.CHANGE_LOCATION_FORMAT)
    .map(fromSearch.searchNearStores);


export const searchNearStores = (action$, store) =>
  action$.ofType(fromSearch.SEARCH_NEAR_STORES)
    .switchMap(() => {
      const state = store.getState();
      const format = getLocationFormat(state);
      let url = `/api/store/near_sorted?dist=${getDistance(state)}&`;
      if(format === 'address') url += `addr=${getSelectedAddress(state)}`;
      else {
        const loc = getSelectedCoordinates(state);
        url += `lng=${loc.lng}&lat=${loc.lat}`;
      }
      const jwt = getJWT(state);
      return ajax.get(url, { Authorization: `Bearer ${jwt}`})
        .map(res => res.response)
        .map(fromSearch.loadSearchedNearStores)
        .catch(e => console.error(e));
    });


export const searchStoresWithProductName = (action$, store) =>
  action$.ofType(fromSearch.SEARCH_STORES_WITH_PRODUCT)
    .switchMap(() => {
      const state = store.getState();
      const {limit, offset, text} = state.search;
      let url = `/api/store/search?query=${text}&offset=${offset}&limit=${limit}`;

      const jwt = getJWT(state);
      return ajax.get(url, { Authorization: `Bearer ${jwt}`})
        .map(res => res.response)
        .map(fromSearch.loadSearchedStoresWithProductName)
        .catch(e => console.error(e));
    });


export const fetchProducts = (action$, store) =>
  action$.ofType(fromSearch.FETCH_PRODUCTS)
    .switchMap(() => {
      const state = store.getState();
      const {limit, offset, fetchClosestOption, selectedCoordinates} = state.search;
      const {lat, lng} = selectedCoordinates;
      let url;
      if(fetchClosestOption === 'nearest') url = `/api/product/nearest?lng=${lng}&lat=${lat}&offset=${offset}&limit=${limit}`;
      else url = `/api/product?offset=${offset}&limit=${limit}`;

      const jwt = getJWT(state);
      return ajax.get(url, { Authorization: `Bearer ${jwt}`})
        .map(res => res.response)
        .map(fromSearch.loadProducts)
        .catch(e => console.error(e));
    });



export const searchEpics = [
  triggerSearchNearStores,
  searchNearStores,
  searchStoresWithProductName,
  fetchProducts
];