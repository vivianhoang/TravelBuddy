import * as actions from './actions';

export interface App {
  username: string;
}

export interface MatchStatus {
  username: string;
  status: 'matched' | 'no-match';
}

export interface ReduxState {
  app: App;
}

export interface Store {
  dispatch: actions.Dispatcher;
  getState: () => ReduxState;
}