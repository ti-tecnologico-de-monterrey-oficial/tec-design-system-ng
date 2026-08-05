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

// export interface IBmbApp {
//   icon: string;
//   title: string;
//   link?: string;
//   target?: IBmbTargetLink;
//   appearance: IBmbInteractiveIconAppearance;
//   callbackParam?: any;
// }

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