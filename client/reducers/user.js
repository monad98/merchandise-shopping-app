import * as fromUser from '../actions/user';
import { createSelector } from 'reselect'

const initialState = {
  user: null,
  jwt: null
};

/**
 * Reducers
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case fromUser.LOAD_USER_INFO: {
      return action.payload;
    }

    case fromUser.LOGOUT_SUCCESS: {
      return initialState;
    }

    default:
      return state;
  }
}

/**
 * Selectors
 */
export const getUserInfo = (state) => state.user;
export const getJWT = (state) => state.jwt;