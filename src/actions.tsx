export enum ActionType {
  CreateOffer = 'CreateOffer',
}

export interface CreateOffer {
  type: ActionType.CreateOffer,
  name: string,
}

export type Action =
  | CreateOffer;

  export type Dispatcher = (action: Action) => void;
