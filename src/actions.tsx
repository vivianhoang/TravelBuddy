import * as models from './models';

export enum ActionType {
  FindMatch = 'FindMatch',
  SignIn = 'SignIn',
  UpdateUser = 'UpdateUser',
  ResetMatch = 'ResetMatch',
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

export interface UpdateUser {
  type: ActionType.UpdateUser,
  user: models.User,
}

export interface ResetMatch {
  type: ActionType.ResetMatch,
  username: string,
}

export type Action =
  | FindMatch
  | SignIn
  | UpdateUser
  | ResetMatch;

export type Dispatcher = (action: Action) => void;
