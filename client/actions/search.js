/**
 * Action types
 */


export const RESET_SEARCH = 'RESET_SEARCH';
export const CHANGE_LOCATION_FORMAT = 'CHANGE_LOCATION_FORMAT';
export const CHANGE_DISTANCE = 'CHANGE_DISTANCE';
export const CHANGE_LIMIT = 'CHANGE_LIMIT';
export const CHANGE_OFFSET = 'CHANGE_OFFSET';
export const CHANGE_TEXT = 'CHANGE_TEXT';
export const TOGGLE_CLOEST_OPTION = 'TOGGLE_CLOEST_OPTION';
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION';
export const UPDATE_LOCATION_WITHOUT_FETCHING = 'UPDATE_LOCATION_WITHOUT_FETCHING';
export const SEARCH_NEAR_STORES = 'SEARCH_NEAR_STORES';
export const SEARCH_STORES_WITH_PRODUCT = 'SEARCH_STORES_WITH_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const LOAD_SEARCHED_NEAR_STORES = 'LOAD_SEARCHED_NEAR_STORES';
export const LOAD_SEARCHED_STORES_WITH_NAME = 'LOAD_SEARCHED_STORES_WITH_NAME';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';


/**
 * Actions
 */

export function resetSearch() {
  return {
    type: RESET_SEARCH
  }
}

export function changeLocationFormat (ev) {
  return {
    type: CHANGE_LOCATION_FORMAT,
    payload: ev.target.value
  };
}

export function changeDistance (ev) {
  return {
    type: CHANGE_DISTANCE,
    payload: ev.target.value
  };
}

export function changeLimit(ev) {
  return {
    type: CHANGE_LIMIT,
    payload: ev.target.value
  }
}

export function changeOffset(ev) {
  return {
    type: CHANGE_OFFSET,
    payload: ev.target.value
  }
}

export function changeText(ev) {
  return {
    type: CHANGE_TEXT,
    payload: ev.target.value
  }
}

export function toggleClosestOption(ev) {
  return {
    type: TOGGLE_CLOEST_OPTION,
    payload: ev.target.value
  }
}

export function updateSelectedLocation (LatLng) {
  return {
    type: UPDATE_SELECTED_LOCATION,
    payload: LatLng
  };
}

export function updateLocationWithoutFetch (LatLng) {
  return {
    type: UPDATE_LOCATION_WITHOUT_FETCHING,
    payload: LatLng
  };
}

export function searchNearStores () {
  return {
    type: SEARCH_NEAR_STORES
  };
}

export function loadSearchedNearStores (stores) {
  return {
    type: LOAD_SEARCHED_NEAR_STORES,
    payload: stores
  };
}

export function searchStoresWithProductName () {
  return {
    type: SEARCH_STORES_WITH_PRODUCT
  };
}

export function loadSearchedStoresWithProductName (stores) {
  return {
    type: LOAD_SEARCHED_STORES_WITH_NAME,
    payload: stores
  };
}

export function fetchProducts () {
  return {
    type: FETCH_PRODUCTS
  };
}

export function loadProducts (products) {
  return {
    type: LOAD_PRODUCTS,
    payload: products
  };
}

