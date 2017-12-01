import * as actions from './actions';

export interface App {
  username: string;
}

export interface User {
  username: string,
  pendingId?: string,
  connectionId?: string,
}

export interface ReduxState {
  app: App;
}

export interface Store {
  dispatch: actions.Dispatcher;
  getState: () => ReduxState;
}

export type City = 'SF' | 'NY' | 'LA';
