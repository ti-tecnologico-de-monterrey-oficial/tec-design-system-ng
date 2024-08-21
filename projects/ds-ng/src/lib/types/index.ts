import { IBmbInteractiveIconAppearance } from '../components/bmb-interactive-icon/bmb-interactive-icon.component';

export type SizeNames = 'xs' | 's' | 'm' | 'l' | 'xl' | 'none' | 'auto';
export type IButtonAppearance =
  | 'primary'
  | 'secondary-filled'
  | 'secondary-outlined'
  | 'destructive';
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
