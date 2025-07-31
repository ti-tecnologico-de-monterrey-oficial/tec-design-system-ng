import { DateTime } from 'luxon';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { IButtonAppearance } from '../../types';

export interface IBmbAlertTag {
  text: string;
  color: IBbmBgAppearance;
}

export interface IBmbDataAlertDetails {
  text: string;
  style?: 'normal' | 'bold' | 'italic' | 'underline';
  href?: string;
  type: 'paragraph' | 'image' | 'video' | 'link' | 'button' | 'title';
  variant?: IButtonAppearance;
  event?: (id: string | number) => void;
}

export interface IBmbDataAlert {
  id: number | string;
  title: string;
  description: IBmbDataAlertDetails[];
  date: string;
  isRead: boolean;
  time: string;
  tags?: IBmbAlertTag[];
  type: string;
  isFavorite: boolean;
  isArchived: boolean;
}

export type IBmbDataAlertsEventType =
  | 'isRead'
  | 'tags'
  | 'isFavorite'
  | 'isArchived';

export interface IBmbDataAlertsOutput {
  type: string;
  data: string[];
}

export interface IBmbDataAlertsParsed extends IBmbDataAlert {
  pDate: DateTime;
}

export interface IBmbAlertCenterCategories {
  recent: IBmbDataAlertsParsed[];
  sevenDays: IBmbDataAlertsParsed[];
  month: IBmbDataAlertsParsed[];
  rest: IBmbDataAlertsParsed[];
}

export interface IBmbAlertEmptyState {
  buttonText?: string;
  onClick?: () => void;
  primaryText: string;
  secondaryText?: string;
  showButton?: boolean;
  size: 'large' | 'medium' | 'small';
  tertiaryText?: string;
}

export interface IBmbAlertCenterTabConfig {
  title: string;
  isMobile: boolean;
  isDesktop: boolean;
}

export interface IBmbAlertCenterProtoEventFooter {
  event: IBmbDataAlertsEventType;
  alerts: string[];
}

export interface IBmbAlertCenterFooterEvent {
  alerts: IBmbDataAlert[];
  event: string;
}
