import { ajax } from 'rxjs/observable/dom/ajax';
import * as fromUser from '../actions/user';
import {push} from 'react-router-redux';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
const asyncLocalStorageSetItem = (key, value) => of(localStorage.setItem(key, value)); // return value of setItem is null
const asyncLocalStorageRemoveItem = (key, value) => of(localStorage.removeItem(key)); // return: of(null)

export const checkJWTAtLocalStorage = (action$) =>
  action$.ofType(fromUser.CHECK_SAVED_JWT)
    .map(() => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) return fromUser.fetchUserInfo(jwt);
      return fromUser.noJWTFound();
    })
    .catch(fromUser.authError);

export const signup = (action$) =>
  action$.ofType(fromUser.SIGNUP)
    .map(action => action.payload)
    .switchMap(({email, password}) =>
      ajax.post(`/api/user/signup`, {email, password})
        .map(ajaxRes => ajaxRes.response)
        .map(fromUser.signupSuccess)
        .catch(fromUser.signupError)
    );

export const moveToLoginPage = (action$) =>
  action$.ofType(fromUser.SIGNUP_SUCCESS)
    .delay(2000)
    .map(() => push('/login'));

export const fetchUserInfo = (action$) =>
  action$.ofType(fromUser.FETCH_USER_INFO)
    .map(action => action.payload)
    .switchMap(jwt =>
      ajax.get(`/api/user/me`, { Authorization: `Bearer ${jwt}`})
        .map(res => res.response)
        .map(user => fromUser.loadUserInfo({user, jwt}))
        .catch(fromUser.logout)
    );

export const login = (action$) =>
  action$.ofType(fromUser.LOGIN)
    .map(action => action.payload)
    .switchMap(({email, password}) =>
      ajax.post(`/api/user/login`, {email, password})
        .map(ajaxRes => ajaxRes.response.token)
        .map(fromUser.saveJWT)
        .catch(fromUser.loginError)
    );
export const loginSuccess = (action$) =>
  action$.ofType(fromUser.SAVE_JWT_TO_LOCAL_STORAGE)
    .map(fromUser.loginSuccess);

export const moveToMainPage = (action$) =>
  action$.ofType(fromUser.LOGIN_SUCCESS, fromUser.LOGOUT_SUCCESS)
    .map(() => push('/'))
    .catch(fromUser.authError);

export const saveJWT = (action$) =>
  action$.ofType(fromUser.SAVE_JWT_TO_LOCAL_STORAGE)
    .map(action => action.payload)
    .switchMap(jwt =>
      asyncLocalStorageSetItem('jwt', jwt)
        .map(() => fromUser.fetchUserInfo(jwt))
    );

export const logout = (action$) =>
  action$.ofType(fromUser.LOGOUT)
    .switchMap(() =>
      asyncLocalStorageRemoveItem('jwt')
        .map(fromUser.logoutSucess)
        .catch(fromUser.authError)
    );

export const userEpics = [
  checkJWTAtLocalStorage,
  signup,
  fetchUserInfo,
  moveToLoginPage,
  login,
  loginSuccess,
  moveToMainPage,
  saveJWT,
  logout
];