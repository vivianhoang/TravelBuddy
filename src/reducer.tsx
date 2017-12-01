import { combineReducers } from 'redux';
import * as _ from 'lodash';
import * as models from './models';
import * as actions from './actions';
const { ActionType } = actions;

const defaultAppState = (): models.App => {
  const state: models.App = {
    user: undefined,
  };
  return state;
};

const app = (state: models.App = defaultAppState(), action: actions.Action): models.App => {
  if (!action) {
    return state;
  }

  var newState = _.cloneDeep(state);

  switch (action.type) {
    // case ActionType.CreateOffer:
    //   newState.isMatchOpen = !newState.isMatchOpen;
    //   break;
    case ActionType.UpdateUser:
      {
        const { user } = action;
        newState.user = user;
      }
      break;
  }
  return newState;
}

export const reducer = combineReducers({
  app,
});