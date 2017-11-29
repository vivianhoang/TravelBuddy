import { combineReducers } from 'redux';
import * as _ from 'lodash';
import * as models from './models';
import * as actions from './actions';
const { ActionType } = actions;

const defaultAppState = (): models.App => {
  const state: models.App = {
    bit: false,
  };
  return state;
};

const app = (state: models.App = defaultAppState(), action: actions.Action): models.App => {
  if (!action) {
    return state;
  }

  var newState = _.cloneDeep(state);

  switch (action.type) {
    // case ActionType.UpdateBit:
    //   newState.bit = !newState.bit;
    //   break;
  }
  return newState;
}

export const reducer = combineReducers({
  app,
});