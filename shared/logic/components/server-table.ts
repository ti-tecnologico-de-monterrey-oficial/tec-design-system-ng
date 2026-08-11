import type { IBmbServerTableColumn } from '../../types/components/server-table';

export const getServerTableDisplayedColumns = (
  columns: IBmbServerTableColumn[],
): string[] => columns.map(({ key }) => key);
