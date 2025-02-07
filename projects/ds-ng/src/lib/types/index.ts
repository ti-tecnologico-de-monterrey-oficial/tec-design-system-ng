import { IBmbInteractiveIconAppearance } from '../components/bmb-interactive-icon/bmb-interactive-icon.component';

export * from '../components/bmb-timestream/types';
export * from '../components/bmb-push-notification/types';
export * from '../components/bmb-advertisement-card/types';
export * from '../components/bmb-login-onboarding/types';
export * from '../components/bmb-filter-card/bmb-filter-card.interface';
export * from '../components/bmb-alert-center/types';

export type SizeNames = 'xs' | 's' | 'm' | 'l' | 'xl' | 'none' | 'auto';
export type IButtonAppearance =
  | 'primary'
  | 'secondary-filled'
  | 'secondary-outlined'
  | 'destructive'
  | 'transparent';
export type IButtonSize = 'small' | 'large' | 'micro';
export type IBbmSidePosition = 'before' | 'after';
export type IBmbHorizontalPosition = 'left' | 'right';
export type IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';
export type IBmbUserImageSize =
  | 'desktop-small'
  | 'desktop-large'
  | 'mobile-small'
  | 'mobile-medium'
  | 'mobile-large'
  | 'mobile-xlarge';

export interface IBmbError {
  codeError: boolean;
  errorMessage: string;
}

export interface IBmbAuthenticateInfo {
  user: string;
  password: string;
}
export interface IBmbUserInfo {
  id: string;
  fullName: string;
  profilePicture: string;
}

export interface IBmbHome {
  data: {
    [x: string]: unknown;
  };
  action?: 'profile' | 'auth';
  callback: (result: unknown) => void;
}

export interface IBmbApp {
  icon: string;
  title: string;
  link?: string;
  target?: IBmbTargetLink;
  appearance: IBmbInteractiveIconAppearance;
}

export interface IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}

export interface IBmbProfileData {
  name: string;
  userImg: string;
  matricula: string;
  mail: string;
  period: string;
  campus: string;
  program: string;
}

export interface IBmbActionHeader {
  icon: string;
  iconSize?: number;
  iconActiveToggle?: string;
  isToggleActive?: boolean;
  link?: string;
  target?: IBmbTargetLink;
  action: () => void;
}
