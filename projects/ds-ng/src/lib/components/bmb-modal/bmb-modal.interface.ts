import { TemplateRef } from '@angular/core';

export type IBmbModalSize = 'small' | 'medium' | 'large';
export type IBmbModalType = 'informative' | 'action' | 'alert';
export type IBmbModalAlertStyle =
  | 'warning'
  | 'neutral'
  | 'primary'
  | 'event'
  | 'success'
  | 'error';
export interface ModalDataConfig {
  title?: string;
  subtitle?: string;
  content?: string | TemplateRef<any> | null;
  type?: IBmbModalType;
  alertStyle?: IBmbModalAlertStyle;
  size?: IBmbModalSize;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  scrollable?: boolean;
  hidePrimaryButton?: boolean;
}
