import * as Firebase from 'firebase';
import {
  createStore,
  applyMiddleware,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from '../reducer';
import { rootSaga } from '../saga';
import * as models from '../models';
import * as actions from '../actions';
const { ActionType } = actions;
import {
  MatchStatusService,
  MatchStatusServiceDelegate,
} from './match-status-service';

export interface AppService extends MatchStatusServiceDelegate {
  firebaseApp: Firebase.app.App;
  reduxStore: Store<models.ReduxState>;
  matchStatusService: MatchStatusService;
}

export function createAppService(): AppService {
  const sagaMiddleware = createSagaMiddleware();
  const reduxStore = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  ) as Store<models.ReduxState>;

  // Initialize services
  const matchStatusService = new MatchStatusService();

  // Initialize Firebase
  const firebaseApp: Firebase.app.App = Firebase.initializeApp({
    apiKey: "AIzaSyALQA_6xmnfKO9GWq-46arvBOwtVDY0fpg",
    authDomain: "travelbuddy-e1b62.firebaseapp.com",
    databaseURL: "https://travelbuddy-e1b62.firebaseio.com",
    projectId: "travelbuddy-e1b62",
    storageBucket: "travelbuddy-e1b62.appspot.com",
    messagingSenderId: "682121885147"
  });

  const updateMatchStatus = createUpdateMatchStatus({reduxStore});

  const service: AppService = {
    firebaseApp,
    reduxStore,
    matchStatusService,
    updateMatchStatus,
  };
  
  // Configure services
  matchStatusService.configure({delegate: service})

  sagaMiddleware.run(rootSaga);

  return service;
}

function createUpdateMatchStatus(params: {reduxStore: models.Store}) {
  const { reduxStore } = params;
  return function updateMatchStatus(params: {matchStatus: models.MatchStatus}) {
    const { matchStatus } = params;
    // Do something with user
   if (!reduxStore.getState().app.username) {
     reduxStore.dispatch({
       type: ActionType.UpdateUsername,
       name: matchStatus.username,
     });
   }
    console.log("Did we get match status?", matchStatus);
  }
}