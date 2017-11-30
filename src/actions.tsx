export enum ActionType {
  CreateOffer = 'CreateOffer',
  SignIn = 'SignIn',
  UpdateUsername = 'UpdateUsername'
}

export interface CreateOffer {
  type: ActionType.CreateOffer,
  name: string,
}

export interface SignIn {
  type: ActionType.SignIn,
  name: string,
}

export interface UpdateUsername {
  type: ActionType.UpdateUsername,
  name: string,
}

export type Action =
  | CreateOffer
  | SignIn
  | UpdateUsername;

  export type Dispatcher = (action: Action) => void;
