import { combineEpics } from 'redux-observable';
import {notificationEpics} from "./notification";
import {searchEpics} from "./search";
import {userEpics} from "./user";


export default combineEpics.apply(null, [
  ...userEpics,
  ...notificationEpics,
  ...searchEpics
]);