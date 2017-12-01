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

export function* signIn(): any {
  while (true) {
    const { name }: actions.SignIn = yield take(ActionType.SignIn);
    try {
      yield put({type: ActionType.StartLoading});

      const response = yield call(() => {
        return api.signIn({ name });
      });
      console.log("RESPONSE", response);
      
      if (!response || !response.ok) {
        console.log("Error response.");
        continue;
      } 
      
      // Start user service
      const { userService } = sharedAppService;
      userService.tearDown();
      userService.username = name;
      userService.setUp();
      
    } catch (err) {
      console.log('error');
    } finally {
      yield put({type: ActionType.FinishLoading});
    }
  }
}

export function* findMatch(): any {
  while (true) {
    const { name, city }: actions.FindMatch = yield take(ActionType.FindMatch);
    try {
      yield put({type: ActionType.StartLoading});
      
      const response = yield call(() => {
        return api.findMatch({ name, city });
      });
      if (!response || !response.ok) {
        console.log("Error response.");
        continue;
      } 
      // Handle success? 
    } catch (err) {
      console.log('error');
    } finally {
      yield put({type: ActionType.FinishLoading});
    }
  }
}

export function *resetMatch(): any {
  while (true) {
    const { username }: actions.ResetMatch = yield take(ActionType.ResetMatch);
    try {
      yield put({type: ActionType.StartLoading});

      const response = yield call(() => {
        return api.resetMatch({ username });
      });
      if (!response || !response.ok) {
        console.log("Error response.");
        continue;
      } 
      // Handle success? 
    } catch (err) {
      console.log('error');
    } finally {
      yield put({type: ActionType.FinishLoading});
    }
  }
}

export function* rootSaga() {
  yield all([
    fork(initialize),
    fork(signIn),
    fork(findMatch),
    fork(resetMatch),
  ]);
}