export interface IBotType {
  name: string;
  icon: string;
  label: string;
}

export interface IChatBarActions extends IBotType {
  action: () => void;
}
