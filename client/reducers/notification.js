import * as fromNotification from '../actions/notification';
import * as fromUser from '../actions/user';
import { createSelector } from 'reselect'

const initialState = null;

/**
 * Reducers
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case fromNotification.UPDATE_NOTIFICATION: {
      return action.payload;
    }

    case fromUser.LOGOUT_SUCCESS:
    case fromNotification.RESET_NOTIFICATION: {
      return initialState;
    }

    default:
      return state;
  }
}

/**
 * Selectors
 */
export const getNotificationMsg = (state) => state.user;