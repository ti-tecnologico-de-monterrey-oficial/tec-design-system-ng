import type { IBbmBgAppearance } from './components/advertisement-card';
import type { IBmbInteractiveIconAppearance } from './components/interactive-icon';

// components
// export * from './components/advertisement-card';
export * from './components/badge';
export * from './components/bottom-navigation-bar';
export * from './components/card';
export * from './components/divider';
export * from './components/grade-value';
export * from './components/iframe';
export * from './components/interactive-icon';
export * from './components/layout';
export * from './components/legend';
export * from './components/notification-counter';
export * from './components/progress-circle';
export * from './components/server-table';
export * from './components/title';
export * from './components/tooltip';
export * from './input';
export * from './utils';
export * from './components/action-icon';
export * from './components/skeleton';

// types
export * from './colors';
export type { IBmbNotificationCounterType } from './components/notification-counter';
export type { BmbSkeletonType } from './components/skeleton';
export type {
  BmbValueCounterFormatter,
  BmbValueCounterParts,
} from './components/value-counter';
export type {
  BmbIframeAttributes,
  BmbIframeLoading,
  BmbIframeReferrerPolicy,
} from './components/iframe';

export type SizeNames =
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | 'none'
  | 'auto'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';
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
  callbackParam?: any;
}

export interface IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}

//Deprecated
export interface IBmbProfileData {
  name: string;
  userImg: string;
  matricula: string;
  mail: string;
  period: string;
  campus: string;
  program: string;
  curp?: string;
  linkedin?: string;
  isExatec?: boolean;
}

export interface IBmbUserData {
  name: string;
  userImg: string;
  email: string;
  registration?: string;
  idDigital?: string;
}

export interface IBmbStudentProfileData {
  userData: IBmbUserData;
  period: string;
  campus: string;
  program: string;
  curp?: string;
  linkedin?: string;
  isExatec?: boolean;
}

export interface IBmbHierarchyProfileData {
  userData: IBmbUserData;
  hierarchyLink?: string;
  hierarchyTarget?: IBmbTargetLink;
}

export interface IBmbCollaboratorProfileData {
  userData: IBmbUserData;
  position: string;
  area: string;
  leader: IBmbHierarchyProfileData | null;
  generalist: IBmbHierarchyProfileData | null;
  enableRolSwitch?: boolean;
}

export interface IBmbActionHeader {
  icon: string;
  alt?: string;
  iconSize?: number;
  iconActiveToggle?: string;
  isToggleActive?: boolean;
  isAccentColor?: boolean;
  link?: string;
  target?: IBmbTargetLink;
  action: (event?: Event) => void;
}

export interface IBmbLinkConfiguration extends IBmbLinkInfo {
  label: string;
}

export interface IBmbLinkInfo {
  link: string;
  target?: IBmbTargetLink;
}

export interface IBmbImageInfo {
  src: string;
  alt: string;
}

export interface IBmbBadgeInfo {
  text: string;
  appearance: IBbmBgAppearance;
  container?: boolean;
}

export interface IDropdownItem {
  idItem?: string;
  icon: string;
  showIndicator?: boolean;
  text: string;
  dotNotification?: number; //for icon
  selectedText?: string;
  value?: string;
  url?: string;
  target?: IBmbTargetLink;
  action?: (event?: unknown) => void;
}

export interface OnboardingStep {
  description: string;
  icon?: string;
  iconSize?: string;
  imageDesktop: string;
  imageMobile: string;
  primaryButton: string;
  secondaryButton?: string;
  shortDescription: string;
  showCheckbox?: boolean;
  subtitle?: string;
  title: string;
}
