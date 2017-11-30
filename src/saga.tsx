import {
  all,
  call,
  fork,
  // select,
} from 'redux-saga/effects';
import { put, take } from './saga-utils';
import { sharedAppService } from './app';
import * as api from './api';
import * as actions from './actions';
const { ActionType } = actions;

export function* initialize(): any {
}

export function* createOffer(): any {
  while (true) {
    const { name }: actions.CreateOffer = yield take(ActionType.CreateOffer);
    console.log("GOT NAME", name);
  }
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
      // yield put({
      //   type: ActionType.UpdateUsername,
      //   name,
      // });
      
    } catch (err) {
      console.log('error');
    }
  }
}

export function* rootSaga() {
  yield all([
    fork(initialize),
    fork(createOffer),
    fork(signIn),
  ]);
}