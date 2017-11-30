export enum ActionType {
  CreateOffer = 'CreateOffer',
  SignIn = 'SignIn',
}

export interface CreateOffer {
  type: ActionType.CreateOffer,
  name: string,
}

export interface SignIn {
  type: ActionType.SignIn,
  name: string,
}

export type Action =
  | CreateOffer
  | SignIn;

  export type Dispatcher = (action: Action) => void;
