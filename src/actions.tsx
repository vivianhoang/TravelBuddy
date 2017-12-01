import * as models from './models';

export enum ActionType {
  FindMatch = 'FindMatch',
  SignIn = 'SignIn',
  UpdateUser = 'UpdateUser',
  ResetMatch = 'ResetMatch',
  SetConnection = 'SetConnection',
  StartLoading = 'StartLoading',
  FinishLoading = 'FinishLoading',
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

export interface SetConnection {
  type: ActionType.SetConnection,
  connection: models.Connection
}

export interface StartLoading {
  type: ActionType.StartLoading,
}

export interface FinishLoading {
  type: ActionType.FinishLoading,
}

export type Action =
  | FindMatch
  | SignIn
  | UpdateUser
  | ResetMatch
  | SetConnection
  | StartLoading
  | FinishLoading;

export type Dispatcher = (action: Action) => void;
