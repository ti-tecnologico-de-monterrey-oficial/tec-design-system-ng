import { TemplateRef } from '@angular/core';

export interface TableColum {
  label: string;
  def: string;
  dataKey: string;
  htmlLabel?: TemplateRef<any>;
  templateActions?: TemplateRef<any>;
  width?: number;
  icon?: string;
}

export interface TableConfig {
  isSelectable?: boolean;
  isPaginable?: boolean;
  isExpandible?: boolean;
  showActions?: boolean;
}
