import { IBmbInteractiveIconAppearance } from '../components/bmb-interactive-icon/bmb-interactive-icon.component';
import { IBbmBgAppearance } from '../components/bmb-advertisement-card/types';

export * from '../components/bmb-timestream/types';
export * from '../components/bmb-push-notification/types';
export * from '../components/bmb-advertisement-card/types';
export * from '../components/bmb-login-onboarding/types';
export * from '../components/bmb-filter-card/bmb-filter-card.interface';
export * from '../components/bmb-alert-center/types';
export * from '../components/bmb-chat-bubbles/types';
export * from '../components/bmb-sidebar/bmb-sidebar.interface';
export * from '../components/bmb-grades/types';
export * from '../components/bmb-tables/bmb-tables.interface';
export * from '../components/bmb-image/types';
export * from './colors';

export type SizeNames = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'none' | 'auto';
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

export type IBmbBaseColors =
  | 'neon-primary'
  | 'neon-tint'
  | 'neon-light'
  | 'blue-primary'
  | 'blue-light'
  | 'blue-tint'
  | 'teal-primary'
  | 'teal-light'
  | 'teal-tint'
  | 'red-primary'
  | 'red-light'
  | 'red-tint'
  | 'green-primary'
  | 'green-light'
  | 'green-tint'
  | 'purple-primary'
  | 'purple-light'
  | 'purple-tint'
  | 'yellow-primary'
  | 'yellow-light'
  | 'yellow-tint'
  | 'black-primary';

export type IBmbmitecBaseColors =
  | 'mitec-blue-primary'
  | 'mitec-blue-light'
  | 'mitec-blue-tint'
  | 'mitec-red-primary'
  | 'mitec-red-light'
  | 'mitec-red-tint'
  | 'mitec-green-primary'
  | 'mitec-green-light'
  | 'mitec-green-tint'
  | 'mitec-orange-primary'
  | 'mitec-orange-light'
  | 'mitec-orange-tint'
  | 'mitec-purple-primary'
  | 'mitec-purple-light'
  | 'mitec-purple-tint';

export type IBmbCreativeBaseColors =
  | 'violet-primary'
  | 'violet-light'
  | 'violet-tint'
  | 'indigo-primary'
  | 'indigo-light'
  | 'indigo-tint'
  | 'emerald-primary'
  | 'emerald-light'
  | 'emerald-tint'
  | 'licorice-primary'
  | 'licorice-light'
  | 'licorice-tint'
  | 'dark-teal-primary'
  | 'dark-teal-light'
  | 'dark-teal-tint'
  | 'peach-primary'
  | 'peach-light'
  | 'peach-tint'
  | 'sepia-primary'
  | 'sepia-light'
  | 'sepia-tint'
  | 'soft-red-primary'
  | 'soft-red-light'
  | 'soft-red-tint'
  | 'wattle-primary'
  | 'wattle-primary-alternative'
  | 'wattle-light'
  | 'wattle-tint'
  | 'ship-cove-primary'
  | 'ship-cove-light'
  | 'ship-cove-tint'
  | 'plantation-primary'
  | 'plantation-light'
  | 'plantation-tint'
  | 'rum-primary'
  | 'rum-light'
  | 'rum-tint'
  | 'ripe-lemon-primary'
  | 'ripe-lemon-primary-alternative'
  | 'ripe-lemon-light'
  | 'ripe-lemon-tint'
  | 'hibiscus-primary'
  | 'hibiscus-light'
  | 'hibiscus-tint';

export type IBmbSemanticBaseColors =
  | 'success-primary'
  | 'success-light'
  | 'success-thin'
  | 'success-primary-alternative'
  | 'success-tint-alternative'
  | 'warning-primary'
  | 'warning-light'
  | 'warning-tint'
  | 'warning-primary-alternative'
  | 'error-primary'
  | 'error-light'
  | 'error-tint'
  | 'info-primary'
  | 'info-light'
  | 'info-tint'
  | 'branding-primary'
  | 'branding-tint'
  | 'branding-tint'
  | 'alert-primary'
  | 'alert-light'
  | 'alert-tint';

export type IBmbSemanticColors =
  | 'semantic-success'
  | 'semantic-info-event'
  | 'semantic-warning'
  | 'semantic-error'
  | 'semantic-brand'
  | 'semantic-alert'
  | 'semantic-neutral';

export type IBmbMitecInstitutionalColors =
  | 'mitec-blue'
  | 'mitec-red'
  | 'mitec-green'
  | 'mitec-orange'
  | 'mitec-purple';

export type IBmbCreativeUseColors =
  | 'creative-use-violet'
  | 'creative-use-indigo'
  | 'creative-use-emerald'
  | 'creative-use-licorice'
  | 'creative-use-dark-teal'
  | 'creative-use-peach'
  | 'creative-use-sepia'
  | 'creative-use-soft-red'
  | 'creative-use-wattle'
  | 'creative-use-ship-cove'
  | 'creative-use-plantation'
  | 'creative-use-rum'
  | 'creative-use-ripe-lemon'
  | 'creative-use-hibiscus';

export type IBmbAlertColors =
  | 'alert-successful'
  | 'alert-event'
  | 'alert-neutral'
  | 'alert-primary-alert-primary'
  | 'alert-warning'
  | 'alert-error';
