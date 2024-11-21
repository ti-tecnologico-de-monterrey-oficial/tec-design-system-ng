import { DateTime } from 'luxon';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { IButtonAppearance } from '../../types';

interface IBmbAlertTag {
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
