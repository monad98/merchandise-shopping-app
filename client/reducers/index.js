import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as fromUser from './user';
import * as fromNotification from './notification';
import * as fromSearch from './search';
import { createSelector } from 'reselect'

/**
 * root reduces
 */
export default combineReducers({
  auth: fromUser.reducer,
  notification: fromNotification.reducer,
  search: fromSearch.reducer,
  routing: routerReducer
});


/**
 * selectors
 */
export const getAuth = state => state.auth;
export const getUserInfo = createSelector(getAuth, fromUser.getUserInfo);
export const getJWT = createSelector(getAuth, fromUser.getJWT);

export const getNotification = state => state.notification;

export const getSearch = state => state.search;
export const getSelectedCoordinates = createSelector(getSearch, fromSearch.getSelectedCoordinates);
export const getSelectedAddress = createSelector(getSearch, fromSearch.getSelectedAddress);
export const getLocationFormat = createSelector(getSearch, fromSearch.getLocationFormat);
export const getDistance = createSelector(getSearch, fromSearch.getDistance);
export const getOffset = createSelector(getSearch, fromSearch.getOffset);
export const getLimit = createSelector(getSearch, fromSearch.getLimit);
export const getText = createSelector(getSearch, fromSearch.getText);
export const getClosestOption = createSelector(getSearch, fromSearch.getClosestOption);
export const getSearchedNearStores = createSelector(getSearch, fromSearch.getSearchedNearStores);
export const getSearchedStoresWithName = createSelector(getSearch, fromSearch.getSearchedStoresWithName);
export const getProductList = createSelector(getSearch, fromSearch.getProductList);
export const getNearestStore = createSelector(getSearch, fromSearch.getNearestStore);
