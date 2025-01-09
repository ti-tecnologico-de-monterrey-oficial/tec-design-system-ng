import { TemplateRef } from '@angular/core';
import { IButtonAppearance } from '../../types';

export type IBmbModalActions = 'close';

export interface IBmbModalAction {
  label: string;
  action: (() => void) | IBmbModalActions;
  type?: IButtonAppearance;
  icon?: string;
}
export type IBmbModalSize = 'small' | 'medium' | 'large';

export type IBmbModalAlertStyle =
  | 'warning'
  | 'neutral'
  | 'primary'
  | 'event'
  | 'success'
  | 'error'
  | 'info';

export interface ModalDataConfig {
  hideFooter?: boolean;
  hideHeader?: boolean;
  title?: string;
  subtitle?: string;
  content?: string | TemplateRef<any> | null;
  size?: IBmbModalSize;
  type?: IBmbModalAlertStyle;
  actions?: any[];
  scrollable?: boolean;
  id?: string;
  disableCloseButtonFooter?: boolean;
}
