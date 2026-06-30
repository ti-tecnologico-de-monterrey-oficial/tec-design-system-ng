export interface IBmbServerTableColumn {
  key: string;
  label: string;
}

export function getDisplayedColumns(
  columns: IBmbServerTableColumn[],
): string[] {
  if (!columns?.length) {
    console.warn('Las columnas están vacías o mal configuradas.');
    return [];
  }

  return columns.map((col) => col.key);
}

export function isSelectedRow(
  selectedRow: any,
  row: any,
): boolean {
  return selectedRow === row;
}