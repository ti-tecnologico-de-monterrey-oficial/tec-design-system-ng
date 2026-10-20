import { DateTime } from 'luxon';
import { IBmbFiltersPosition, TableColum } from '../../types/components/tables';

export function getTablesClasses(filtersPosition: IBmbFiltersPosition): string[] {
  const classList = ['bmb_table'];
  switch (filtersPosition) {
    case 'right':
      classList.push('bmb_table-filters-right');
      break;
    case 'bottom':
      classList.push('bmb_table-filters-bottom');
      break;
    case 'left':
      classList.push('bmb_table-filters-left');
      break;
    default:
      classList.push('bmb_table-filters-top');
  }
  return classList;
}

export function getTablesLastPage(total: number, pageSize: number): number {
  const result = pageSize === 0 ? 0 : Math.ceil(total / pageSize) - 1;
  return Math.max(0, result);
}

export function getTablesPaginationText(
  total: number,
  pageIndex: number,
  pageSize: number,
): string {
  if (total === 0 || pageSize === 0) {
    return `0 de ${total}`;
  }

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, total);

  return `${startIndex} - ${endIndex} de ${total}`;
}

export function getTablesCellClasses(
  semanticType: unknown,
  hasCustomTemplate: boolean,
  index: number,
  disableStickyColumn: boolean,
  truncate: boolean,
  wrap: boolean,
): Record<string, boolean> {
  return {
    'bmb_table-sticky': index === 0 && !disableStickyColumn,
    truncated: truncate,
    wrapped: wrap,
    [`bmb_table-${semanticType}`]: !!semanticType,
    'bmb_table-content-custom': hasCustomTemplate,
  };
}

export function buildTablesDisplayColumns(
  columnDefs: string[],
  config: { isExpandible?: boolean; isSelectable?: boolean; showActions?: boolean },
): string[] {
  const displayColumns = [...columnDefs];

  if (config.isExpandible) displayColumns.unshift('expand');
  if (config.isSelectable) displayColumns.unshift('select');
  if (config.showActions) displayColumns.push('actions');

  return displayColumns;
}

export function normalizeTablesColumns(columns: TableColum[]): TableColum[] {
  return (columns || []).map((col) => ({
    type: 'string',
    labelEn: col.label,
    ...col,
  }));
}

export function filterTablesRows(
  originalData: any[],
  rawColumns: TableColum[],
  filterValues: Record<string, any>,
): any[] {
  let filtered = [...originalData];

  rawColumns.forEach((column) => {
    const key = column.dataKey;
    const type = column.type;

    if (type === 'number') {
      const min = parseInt(filterValues[`${key}_min`]) || null;
      const max = parseInt(filterValues[`${key}_max`]) || null;

      filtered = filtered.filter((row) => {
        const value = +row[key];
        return (
          (min === null || value >= min) && (max === null || value <= max)
        );
      });
    }

    if (type === 'date') {
      const dateFormat = column.dateFormat || 'yyyy-MM-dd';
      const from = filterValues[`${key}_from`]
        ? DateTime.fromFormat(filterValues[`${key}_from`], dateFormat)
        : null;
      const to = filterValues[`${key}_to`]
        ? DateTime.fromFormat(filterValues[`${key}_to`], dateFormat)
        : null;

      filtered = filtered.filter((row) => {
        const dateVal = DateTime.fromFormat(row[key], dateFormat);
        return (!from || dateVal >= from) && (!to || dateVal <= to);
      });
    }

    if (type === 'string') {
      const search = filterValues[`${key}_contains`]?.toLowerCase();
      if (search) {
        filtered = filtered.filter((row) =>
          row[key]?.toLowerCase().includes(search),
        );
      }
    }
  });

  return filtered;
}

export function isTablesRowEven(data: any[], rowIndex: number): boolean {
  const filteredIndex = data
    .filter((row) => !row.isDetail)
    .findIndex((_row, index) => index === rowIndex);
  return filteredIndex % 2 === 0;
}
