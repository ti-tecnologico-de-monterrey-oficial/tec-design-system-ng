import { TemplateRef } from '@angular/core';

export interface ITableLiteColumn {
  label: string;
  labelEn?: string;
  def: string;
  dataKey: string;
  htmlLabel?: TemplateRef<any>;
  templateActions?: TemplateRef<any>;
  width?: number;
  type?: 'string' | 'number' | 'date';
  icon?: string;
  dateFormat?: string;
  isFilterable?: boolean;
  sticky?: boolean | 'auto';
}

export interface ITableLiteConfig {
  isSelectable?: boolean;
  isPaginable?: boolean;
  isExpandible?: boolean;
  showActions?: boolean;
}

export type IBmbTableLiteFiltersPosition = 'top' | 'right' | 'bottom' | 'left';

export type IBmbTableLang = 'en' | 'es';
