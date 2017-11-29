import {
  all,
  // call,
  fork,
  // select,
} from 'redux-saga/effects';
import { put, take } from './saga-utils';
import { sharedAppService } from './index-root';
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

export function* rootSaga() {
  yield all([
    fork(initialize),
    fork(createOffer),
  ]);
}