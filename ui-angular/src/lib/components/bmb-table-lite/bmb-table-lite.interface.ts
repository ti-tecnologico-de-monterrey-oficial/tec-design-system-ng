import { TemplateRef } from '@angular/core';

export interface TableColum {
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

export interface TableConfig {
  isSelectable?: boolean;
  isPaginable?: boolean;
  isExpandible?: boolean;
  showActions?: boolean;
}

export type IBmbFiltersPosition = 'top' | 'right' | 'bottom' | 'left';

export type IBmbTableLang = 'en' | 'es';
