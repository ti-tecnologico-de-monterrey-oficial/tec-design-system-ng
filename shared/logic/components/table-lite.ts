import { DateTime } from 'luxon';
import {
  IBmbTableLiteFiltersPosition,
  ITableLiteColumn,
} from '../../types/components/table-lite';

export function getTableLiteClasses(
  filtersPosition: IBmbTableLiteFiltersPosition,
): string[] {
  const classList = ['bmb_table_lite'];
  switch (filtersPosition) {
    case 'right':
      classList.push('bmb_table_lite-filters-right');
      break;
    case 'bottom':
      classList.push('bmb_table_lite-filters-bottom');
      break;
    case 'left':
      classList.push('bmb_table_lite-filters-left');
      break;
    default:
      classList.push('bmb_table_lite-filters-top');
  }
  return classList;
}

export function isTableLiteColumnSticky(
  sticky: boolean | 'auto' | undefined,
  index: number,
): boolean {
  return sticky === true || (sticky === undefined && index === 0);
}

export function getTableLiteCssVars(
  columnCount: number,
  hasSelect: boolean | undefined,
  hasExpand: boolean | undefined,
  hasActions: boolean | undefined,
): Record<string, string | number> {
  const columnTemplate = `repeat(${columnCount}, minmax(120px, 1fr))`;

  const parts = [
    hasSelect ? 'var(--col-checkbox, 62px)' : '',
    hasExpand ? 'var(--col-expand, 40px)' : '',
    columnTemplate,
    hasActions ? 'var(--col-actions, 80px)' : '',
  ].filter(Boolean);

  return {
    '--col-count': columnCount,
    '--col-checkbox': hasSelect ? '62px' : '0px',
    '--col-expand': hasExpand ? '40px' : '0px',
    '--col-actions': hasActions ? '80px' : '0px',
    '--grid-template': parts.join(' '),
  };
}

export function getTableLiteLastPage(total: number, pageSize: number): number {
  const result = pageSize === 0 ? 0 : Math.ceil(total / pageSize) - 1;
  return Math.max(0, result);
}

export function isTableLiteSinglePage(
  total: number,
  pageSize: number,
): boolean {
  return total <= pageSize;
}

export function getTableLitePaginationText(
  total: number,
  pageIndex: number,
  pageSize: number,
): string {
  if (total === 0 || pageSize === 0) return `0 de ${total}`;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, total);
  return `${startIndex} - ${endIndex} de ${total}`;
}

export function normalizeTableLiteColumns<TTemplate = unknown>(
  columns: ITableLiteColumn<TTemplate>[],
): ITableLiteColumn<TTemplate>[] {
  return (columns || []).map((col) => ({
    type: 'string' as const,
    labelEn: col.labelEn,
    ...col,
  }));
}

export function filterTableLiteRows<TTemplate = unknown>(
  originalData: any[],
  rawColumns: ITableLiteColumn<TTemplate>[],
  filterValues: Record<string, any>,
  searchText: string,
): any[] {
  let filtered = [...originalData];

  rawColumns.forEach((column) => {
    const key = column.dataKey;
    const type = column.type || 'string';

    if (type === 'number') {
      const rawMin = filterValues[`${key}_min`];
      const rawMax = filterValues[`${key}_max`];
      const min =
        rawMin === null || rawMin === undefined || rawMin === ''
          ? null
          : Number(rawMin);
      const max =
        rawMax === null || rawMax === undefined || rawMax === ''
          ? null
          : Number(rawMax);
      filtered = filtered.filter((row) => {
        const v = Number(row[key]);
        if (Number.isNaN(v)) return false;
        return (min === null || v >= min) && (max === null || v <= max);
      });
    }

    if (type === 'date') {
      const dateFormat = column.dateFormat || 'yyyy-MM-dd';
      const rawFrom = filterValues[`${key}_from`];
      const rawTo = filterValues[`${key}_to`];
      const from = rawFrom
        ? DateTime.fromFormat(String(rawFrom), dateFormat)
        : null;
      const to = rawTo ? DateTime.fromFormat(String(rawTo), dateFormat) : null;

      filtered = filtered.filter((row) => {
        const raw = row[key];
        if (!raw) return true;
        const dateVal = DateTime.fromFormat(String(raw), dateFormat);
        if (!dateVal.isValid) return true;
        const gte = !from || (from.isValid && dateVal >= from);
        const lte = !to || (to.isValid && dateVal <= to);
        return gte && lte;
      });
    }

    if (type === 'string') {
      const contains = (filterValues[`${key}_contains`] || '')
        .toLowerCase()
        .trim();
      if (contains) {
        filtered = filtered.filter((row) =>
          (row[key] ?? '').toString().toLowerCase().includes(contains),
        );
      }
    }
  });

  if (searchText) {
    filtered = filtered.filter((row) =>
      rawColumns.some((col) =>
        ((row[col.dataKey] ?? '') + '').toLowerCase().includes(searchText),
      ),
    );
  }

  return filtered;
}
