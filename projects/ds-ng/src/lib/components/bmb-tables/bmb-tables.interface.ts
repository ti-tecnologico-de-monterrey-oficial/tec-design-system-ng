import { TemplateRef } from '@angular/core';

export interface TableColum {
  label: string;
  def: string;
  dataKey: string;
  templateActions?: TemplateRef<any>;
  width?: number;
}

export interface TableConfig {
  isSelectable?: boolean;
  isPaginable?: boolean;
  isExpandible?: boolean;
  showActions?: boolean;
}
