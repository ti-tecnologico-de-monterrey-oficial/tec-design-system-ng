export interface IBotType {
  name: string;
  icon: string;
}

export interface IChatBarActions {
  name: string;
  icon: string;
  action: () => void;
}
