import { IBmbInteractiveIconAppearance } from '../components/bmb-interactive-icon/bmb-interactive-icon.component';

export type SizeNames = 'xs' | 's' | 'm' | 'l' | 'xl' | 'none' | 'auto';
export type IButtonAppearance =
  | 'primary'
  | 'secondary-filled'
  | 'secondary-outlined'
  | 'destructive';
export type IButtonSize = 'small' | 'large' | 'micro';
export interface IBmbApp {
  icon: string;
  title: string;
  link?: string;
  target?: string;
  appearance: IBmbInteractiveIconAppearance;
}
export type IBmbHorizontalPosition = 'left' | 'right';
export * from '../components/bmb-timestream/types';
export * from '../components/bmb-push-notification/types';
export * from '../components/bmb-advertisement-card/types';
export * from '../components/bmb-login-onboarding/types';

export type IBmbColor =
  | 'mariner-50'
  | 'mariner-100'
  | 'mariner-200'
  | 'mariner-300'
  | 'mariner-400'
  | 'mariner-500'
  | 'mariner-700'
  | 'mariner-800'
  | 'mariner-900'
  | 'mariner-950'
  | 'charade-50'
  | 'charade-100'
  | 'charade-200'
  | 'charade-300'
  | 'charade-500'
  | 'charade-600'
  | 'charade-700'
  | 'charade-800'
  | 'charade-900'
  | 'charade-950'
  | 'white-primary'
  | 'blue-tec'
  | 'mitec-blue'
  | 'mitec-green'
  | 'mitec-red'
  | 'mitec-orange'
  | 'black-primary'
  | 'black-light'
  | 'black-tint'
  | 'black-min'
  | 'white-light'
  | 'white-tint'
  | 'white-min'
  | 'neon-primary'
  | 'neon-light'
  | 'neon-tint'
  | 'blue-primary'
  | 'blue-light'
  | 'blue-tint'
  | 'green-primary'
  | 'green-light'
  | 'green-tint'
  | 'purple-primary'
  | 'purple-light'
  | 'purple-tint'
  | 'red-primary'
  | 'red-light'
  | 'red-tint'
  | 'yellow-primary'
  | 'yellow-light'
  | 'yellow-tint'
  | 'teal-primary'
  | 'teal-light'
  | 'teal-tint'
  | 'container-home'
  | 'container-secondary'
  | 'container-button'
  | 'background-main'
  | 'container-home-light'
  | 'container-secondary-light'
  | 'container-button-light'
  | 'background-main-light'
  | 'container-home-tec'
  | 'container-secondary-tec'
  | 'container-button-tec'
  | 'background-main-tec';
