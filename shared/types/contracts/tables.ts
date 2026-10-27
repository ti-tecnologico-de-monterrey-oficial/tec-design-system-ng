export interface TableColum<TTemplate = never> {
  label: string;
  labelEn?: string;
  def: string;
  dataKey: string;
  htmlLabel?: TTemplate;
  templateActions?: TTemplate;
  width?: number;
  type?: 'string' | 'number' | 'date';
  icon?: string;
  dateFormat?: string;
  isFilterable?: boolean;
  cellTemplate?: TTemplate;
}

export interface TableConfig {
  isSelectable?: boolean;
  isPaginable?: boolean;
  isExpandible?: boolean;
  showActions?: boolean;
}

export type IBmbFiltersPosition = 'top' | 'right' | 'bottom' | 'left';

export type BmbTableLang = 'en' | 'es';
