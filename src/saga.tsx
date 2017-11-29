import {
  all,
  // call,
  fork,
  // select,
} from 'redux-saga/effects';
import { put, take } from './saga-utils';
import { sharedAppService } from './index-root';
import * as api from './api';

export function* initialize(): any {
}

export function* rootSaga() {
  yield all([
    fork(initialize),
  ]);
}