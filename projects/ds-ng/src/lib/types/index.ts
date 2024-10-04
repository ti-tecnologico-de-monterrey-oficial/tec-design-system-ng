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
export * from '../components/bmb-filter-card/bmb-filter-card.interface';
