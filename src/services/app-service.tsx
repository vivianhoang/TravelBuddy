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
  UserService,
  UserServiceDelegate,
} from './user-service';

export interface AppService extends UserServiceDelegate {
  firebaseApp: Firebase.app.App;
  reduxStore: Store<models.ReduxState>;
  userService: UserService;
}

export function createAppService(): AppService {
  const sagaMiddleware = createSagaMiddleware();
  const reduxStore = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  ) as Store<models.ReduxState>;

  // Initialize services
  const userService = new UserService();

  // Initialize Firebase
  const firebaseApp: Firebase.app.App = Firebase.initializeApp({
    apiKey: "AIzaSyALQA_6xmnfKO9GWq-46arvBOwtVDY0fpg",
    authDomain: "travelbuddy-e1b62.firebaseapp.com",
    databaseURL: "https://travelbuddy-e1b62.firebaseio.com",
    projectId: "travelbuddy-e1b62",
    storageBucket: "travelbuddy-e1b62.appspot.com",
    messagingSenderId: "682121885147"
  });

  const updateUser = createUpdateUser({reduxStore});
  const setConnection = createSetConnection({reduxStore});

  const service: AppService = {
    firebaseApp,
    reduxStore,
    userService,
    updateUser,
    setConnection
  };
  
  // Configure services
  userService.configure({delegate: service})

  sagaMiddleware.run(rootSaga);

  return service;
}

function createUpdateUser(params: {reduxStore: models.Store}) {
  const { reduxStore } = params;
  return function updateUser(params: {user: models.User}) {
    const { user } = params;
    reduxStore.dispatch({
      type: ActionType.UpdateUser,
      user,
    });
  }
}

function createSetConnection(params: {reduxStore: models.Store}) {
  const { reduxStore } = params;
  // params need to match what was called in the delegate
  return function setConnection(params: {connection: models.Connection}) {
    const { connection } = params;
    reduxStore.dispatch({
      type: ActionType.SetConnection,
      connection
    })
  }
}