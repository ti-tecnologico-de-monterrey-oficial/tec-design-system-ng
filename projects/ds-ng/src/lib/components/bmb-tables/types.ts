export interface IBmbColumn {
  id?: string | number;
  name: string;
  width?: string;
  isSortable?: boolean;
  isFilterable?: boolean;
  isEditable?: boolean;
  isHidden?: boolean;
  isResizable?: boolean;
  minWidth?: string | number;
  maxWidth?: string | number;
  templateRef?: any;
  title?: string;
}

export interface BmbTableConfig {
  id?: string;
  data: any[];
  columns: IBmbColumn[];
  columnOrder?: string | number;
  orderType?: 'asc' | 'desc';
  pageSize?: number;
  page?: number;
}
