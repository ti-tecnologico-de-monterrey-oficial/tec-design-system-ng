import { SizeNames } from '../../types/utils';

export function getBmbLayoutGridElementClass(options: {}): string[] {
  return ['bmb_layout-grid'];
}

export function getBmbLayoutGridElementStyle(options: {
  rowSize: string[] | string;
  rows: number;
  columnSize: string[] | string;
  columns: number;
  colGapSize: SizeNames;
  rowGapSize: SizeNames;
  height: string | number;
}): string {
  const rowTemplate: string = getGridRules(options.rowSize, options.rows);
  const colTemplate: string = getGridRules(options.columnSize, options.columns);

  return `
      grid-template-columns: ${colTemplate};
      grid-template-rows: ${rowTemplate};
      gap: var(--bmb-gap-${options.colGapSize}) var(--bmb-gap-${options.rowGapSize});
      height: ${typeof options.height === 'number' ? `${options.height}px` : options.height};
    `;
}

export function getBmbLayoutGridItemElementClass(options: {}): string[] {
  return ['bmb_layout-grid-item'];
}

export function getBmbLayoutGridItemElementStyle(options: {
  rowStart: number;
  colStart: number;
  numberOfRows: number;
  numberOfColumns: number;
}): string {
  return `
      grid-area: ${options.rowStart} / ${options.colStart} / ${options.numberOfRows + options.rowStart} / ${options.numberOfColumns + options.colStart};
    `;
}

export function generateGridArray(size: string[], elements: number): string {
  if (elements !== size.length) {
    return size.reduce((acc, curr, index) => {
      if (index === size.length - 1) {
        return acc + `repeat(${elements - index}, ${curr})`;
      }
      return acc + `${curr} `;
    }, '');
  }
  return size.join(' ');
}

export function getGridRules(
  size: string | string[],
  elements: number,
): string {
  if (typeof size === 'string') return `repeat(${elements}, ${size})`;
  return generateGridArray(size as string[], elements);
}
