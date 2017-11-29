import {
  put as sagaPut,
  take as sagaTake,
} from 'redux-saga/effects';

import actions from './actions';

export interface Put {
  (action: actions.Action): any;
}

export interface Take {
  (actionType: actions.ActionType | actions.ActionType[]): any
}

export const put: Put = sagaPut;
export const take: Take = sagaTake;
