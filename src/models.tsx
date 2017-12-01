import * as actions from './actions';

export interface App {
  user: User | undefined;
  connections: Connections;
}

export interface User {
  username: string,
  pendingId?: string,
  connectionId?: string,
}

export interface Connection {
  connectionId: string,
  city: City,
  members: Members,
}

export interface Members {
  // NOT an array. This is a KEY.
  [username: string]: true
}

export interface Connections {
  [connectionId: string]: Connection
}

export interface ReduxState {
  app: App;
}

export interface Store {
  dispatch: actions.Dispatcher;
  getState: () => ReduxState;
}

export type City = 'SF' | 'NY' | 'LA';
