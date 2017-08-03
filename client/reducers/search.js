import * as fromSearch from '../actions/search';
import * as fromUser from '../actions/user';
import { createSelector } from 'reselect'

const initialState = {
  locationFormat: 'coordinates', // or 'address'
  selectedCoordinates: { lat: 32.715738, lng: -117.1610838 }, //default location : San Diego
  selectedAddress: 'San Diego, CA, USA',
  distance: 20,
  searchedStores: [],
  searchedStoresWithName: [],
  limit: 20,
  offset: 0,
  fetchClosestOption: 'all',
  text: '',
  products: [],
  nearestStore: null
};

/**
 * Reducers
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case fromSearch.CHANGE_LOCATION_FORMAT: {
      const locationFormat = action.payload;
      return Object.assign({}, state, {locationFormat});
    }

    case fromUser.LOGOUT_SUCCESS:
    case fromSearch.RESET_SEARCH: {
      return initialState;
    }

    case fromSearch.CHANGE_DISTANCE: {
      const distance = action.payload;
      return Object.assign({}, state, {distance});
    }

    case fromSearch.CHANGE_LIMIT: {
      const limit = action.payload;
      return Object.assign({}, state, {limit});
    }

    case fromSearch.CHANGE_TEXT: {
      const text = action.payload;
      return Object.assign({}, state, {text});
    }

    case fromSearch.CHANGE_OFFSET: {
      const offset = action.payload;
      return Object.assign({}, state, {offset});
    }

    case fromSearch.TOGGLE_CLOEST_OPTION: {
      const fetchClosestOption = action.payload;
      return Object.assign({}, state, {fetchClosestOption});
    }


    case fromSearch.UPDATE_LOCATION_WITHOUT_FETCHING:
    case fromSearch.UPDATE_SELECTED_LOCATION: {
      const selectedCoordinates = action.payload.location;
      const selectedAddress = action.payload.gmaps.formatted_address;
      return Object.assign({}, state, {selectedCoordinates, selectedAddress});
    }

    case fromSearch.LOAD_SEARCHED_NEAR_STORES: {
      const searchedStores = action.payload;
      return Object.assign({}, state, {searchedStores});
    }

    case fromSearch.LOAD_SEARCHED_STORES_WITH_NAME: {
      const searchedStoresWithName = action.payload;
      return Object.assign({}, state, {searchedStoresWithName});
    }

    case fromSearch.LOAD_PRODUCTS: {
      const data = action.payload;
      let products, nearestStore;
      if(Array.isArray(data)) {
        products = data.map(p => Object.assign({}, p.details[0], {price: p.price, quantity: p.quantity, distance: p.distance ? p.distance.toFixed(2) : null, store: p.storeInfo[0]}));
        nearestStore = null;
      } else if(data.store && Array.isArray(data.store)) {
        products = data.products.map(p => Object.assign({}, p.details[0], {price: p.price, quantity: p.quantity}));
        nearestStore = data.store[0];
      }


      return Object.assign({}, state, {products, nearestStore});
    }

    default:
      return state;
  }
}

/**
 * Selectors
 */
export const getSelectedCoordinates = (state) => state.selectedCoordinates;
export const getSelectedAddress = (state) => state.selectedAddress;
export const getLocationFormat = (state) => state.locationFormat;
export const getDistance = (state) => state.distance;
export const getLimit = (state) => state.limit;
export const getOffset = (state) => state.offset;
export const getText = (state) => state.text;
export const getClosestOption = (state) => state.fetchClosestOption;
export const getSearchedNearStores = (state) => state.searchedStores;
export const getSearchedStoresWithName = (state) => state.searchedStoresWithName;
export const getProductList = (state) => state.products;
export const getNearestStore = (state) => state.nearestStore;