import * as models from './models';

export enum ActionType {
  FindMatch = 'FindMatch',
  SignIn = 'SignIn',
  UpdateUsername = 'UpdateUsername'
}

export interface FindMatch {
  type: ActionType.FindMatch,
  name: string,
  city: models.City
}

export interface SignIn {
  type: ActionType.SignIn,
  name: string,
}

export interface UpdateUsername {
  type: ActionType.UpdateUsername,
  username: string,
}

export type Action =
  | FindMatch
  | SignIn
  | UpdateUsername;

export type Dispatcher = (action: Action) => void;
