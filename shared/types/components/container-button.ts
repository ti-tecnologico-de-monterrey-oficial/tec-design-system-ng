export type IBmbContainerButtonState = 'disabled' | 'error';
export interface IBmbContainerButtonClassOptions {
  square?: boolean;
  small?: boolean;
  iconLeft?: string;
  state?: IBmbContainerButtonState;
  alternative?: boolean;
}
