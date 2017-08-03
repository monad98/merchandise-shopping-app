import * as fromUser from '../actions/user';
import * as fromNotification from '../actions/notification';
import 'rxjs/add/operator/map';
import {concat} from 'rxjs/observable/concat';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

export const updateNotification = (action$) =>
  action$.ofType(fromUser.SIGNUP_SUCCESS)
    .switchMap(() =>
      concat(
        of(fromNotification.updateNotification(
          {
            text: 'Created Account Successfully! Moving to Login Page after 2 seconds.',
            type: 'primary'
          }
        )),
        of(fromNotification.resetNotification())
          .delay(2000)
      )
    );


export const notificationEpics = [
  updateNotification,
];