import { TemplateRef } from '@angular/core';

export interface ModalDataConfig {
  title?: string;
  subtitle?: string;
  content?: string | TemplateRef<any> | null;
  type?: 'informative' | 'action' | 'alert';
  alertStyle?:
    | 'warning'
    | 'neutral'
    | 'primary'
    | 'event'
    | 'success'
    | 'error';
  size?: 'small' | 'medium' | 'large';
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  scrollable?: boolean;
}
