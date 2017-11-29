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

export interface AppService {
  firebaseApp: Firebase.app.App;
  reduxStore: Store<models.ReduxState>;
}

export function createAppService(): AppService {
  const sagaMiddleware = createSagaMiddleware();
  const reduxStore = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  ) as Store<models.ReduxState>;

  // Initialize Firebase
  const firebaseApp: Firebase.app.App = Firebase.initializeApp({
    apiKey: "AIzaSyALQA_6xmnfKO9GWq-46arvBOwtVDY0fpg",
    authDomain: "travelbuddy-e1b62.firebaseapp.com",
    databaseURL: "https://travelbuddy-e1b62.firebaseio.com",
    projectId: "travelbuddy-e1b62",
    storageBucket: "travelbuddy-e1b62.appspot.com",
    messagingSenderId: "682121885147"
  });

  const services: AppService = {
    firebaseApp,
    reduxStore,
  };

  sagaMiddleware.run(rootSaga);

  return services;
}