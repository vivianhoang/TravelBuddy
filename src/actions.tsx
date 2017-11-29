export enum ActionType {
  UpdateBit = 'UpdateBit',
}

export interface UpdateBit {
  type: ActionType.UpdateBit,
}

export type Action =
  | UpdateBit;

  export type Dispatcher = (action: Action) => void;
  