import { TemplateRef, Type } from '@angular/core';
import { IButtonAppearance } from '../../types';

export type IBmbModalSize = 'small' | 'medium' | 'large';
export type IBmbModalType = 'informative' | 'action' | 'alert';
export type IBmbNativeModalSize = IBmbModalSize | 'x-small' | 'x-large';
export type IBmbModalAlertStyle =
  | 'warning'
  | 'neutral'
  | 'primary'
  | 'event'
  | 'success'
  | 'error';
export interface IBmbActionButton {
  buttonName: string;
  appearance?: IButtonAppearance;
  label: string;
  icon?: string;
  action: () => void;
}

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
  hideSecondaryButton?: boolean;
  extendButtons?: boolean;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  closeAction?: () => void;
}
export interface IBmbNativeModal
  extends Omit<
    ModalDataConfig,
    | 'primaryAction'
    | 'secondaryAction'
    | 'closeAction'
    | 'extendButtons'
    | 'alertStyle'
    | 'size'
    | 'type'
    | 'content'
  > {
  modalId?: string;
  size?: IBmbNativeModalSize;
  iconStyle?: IBmbModalAlertStyle;
  actions?: IBmbActionButton[];
  closeModalClicked?: (event: unknown) => void;
  context?: { [key: string]: any };
  content?: string | TemplateRef<any> | null | Type<any>;
}
