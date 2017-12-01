import {
  all,
  call,
  fork,
  // select,
} from 'redux-saga/effects';
import { take } from './saga-utils';
import { sharedAppService } from './app';
import * as api from './api';
import * as actions from './actions';
const { ActionType } = actions;

export function* initialize(): any {
}

export function* signIn(): any {
  while (true) {
    const { name }: actions.SignIn = yield take(ActionType.SignIn);
    try {
      const response = yield call(() => {
        return api.signIn({ name });
      });
      console.log("RESPONSE", response);
      
      if (!response || !response.ok) {
        console.log("Error response.");
        continue;
      } 
      
      // Start match status service
      const { matchStatusService } = sharedAppService;
      matchStatusService.tearDown();
      matchStatusService.username = name;
      matchStatusService.setUp();
      
    } catch (err) {
      console.log('error');
    }
  }
}

export function* findMatch(): any {
  while (true) {
    const { name, city }: actions.FindMatch = yield take(ActionType.FindMatch);
    try {
      const response = yield call(() => {
        return api.findMatch({ name, city });
      });
      console.log("RESPONSE", response);
      
      if (!response || !response.ok) {
        console.log("Error response.");
        continue;
      } 
      
      // Start match status service
      const { matchStatusService } = sharedAppService;
      matchStatusService.tearDown();
      matchStatusService.username = name;
      matchStatusService.setUp();
      
    } catch (err) {
      console.log('error');
    }
  }
}

export function* rootSaga() {
  yield all([
    fork(initialize),
    fork(findMatch),
    fork(signIn),
  ]);
}