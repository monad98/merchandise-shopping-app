/**
 * Action types
 */
export const CHECK_SAVED_JWT = 'CHECK_SAVED_JWT';
export const NO_JWT_FOUND = 'NO_JWT_FOUND';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOAD_USER_INFO = 'LOAD_USER_INFO';
export const SAVE_JWT_TO_LOCAL_STORAGE = 'SAVE_JWT_TO_LOCAL_STORAGE';
export const AUTH_ERROR = 'AUTH_ERROR';


/**
 * Actions
 */
export function checkJWT () {
  return {
    type: CHECK_SAVED_JWT
  };
}

export function noJWTFound () {
  return { type: NO_JWT_FOUND };
}

export function fetchUserInfo (jwt) {
  return {
    type: FETCH_USER_INFO,
    payload: jwt
  };
}


export function login ({email, password}) {
  return {
    type: LOGIN,
    payload: {
      email,
      password
    }
  };
}

export function loginSuccess () {
  return {
    type: LOGIN_SUCCESS
  };
}
export function loginError (err) {
  return {
    type: LOGIN_ERROR,
    payload: err
  };
}

export function signup ({email, password}) {
  return {
    type: SIGNUP,
    payload: {
      email,
      password
    }
  };
}

export function signupSuccess () {
  return {
    type: SIGNUP_SUCCESS
  };
}

export function signupError () {
  return {
    type: SIGNUP_ERROR
  };
}

export function logout () {
  return {
    type: LOGOUT
  };
}

export function logoutSucess () {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function loadUserInfo ({user, jwt}) {
  return {
    type: LOAD_USER_INFO,
    payload: {
      user, jwt
    }
  };
}

export function saveJWT (jwt) {
  return {
    type: SAVE_JWT_TO_LOCAL_STORAGE,
    payload: jwt
  };
}

export function authError (err) {
  return {
    type: AUTH_ERROR,
    payload: err
  };
}
