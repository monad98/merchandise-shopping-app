/**
 * Action types
 */
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';


/**
 * Actions
 */
export function updateNotification ({text, type}) {
  return {
    type: UPDATE_NOTIFICATION,
    payload: {
      text,
      type
    }
  };
}

export function resetNotification () {
  return {
    type: RESET_NOTIFICATION
  };
}