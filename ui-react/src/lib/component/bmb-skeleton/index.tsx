import type { CSSProperties } from 'react';
import '../../../../../shared/assets/styles/components/_skeleton.scss';
import type { BmbSkeletonType } from '../../_shared/types/components/skeleton';

export interface BmbSkeletonProps {
  type?: BmbSkeletonType;
}

const gridItem = (
  colStart: number,
  rowStart: number,
  numberOfColumns = 1,
  numberOfRows = 1,
): CSSProperties => ({
  gridArea: `${rowStart} / ${colStart} / ${numberOfRows + rowStart} / ${numberOfColumns + colStart}`,
});

const grid = (
  columns: number,
  rows: number,
  colGapSize: string,
  rowGapSize: string,
  columnSize: string | string[] = 'auto',
  rowSize: string | string[] = 'auto',
): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: templateFor(columnSize, columns),
  gridTemplateRows: templateFor(rowSize, rows),
  gap: `var(--bmb-gap-${colGapSize}) var(--bmb-gap-${rowGapSize})`,
});

const templateFor = (size: string | string[], elements: number): string => {
  if (typeof size === 'string') return `repeat(${elements}, ${size})`;
  if (size.length === elements) return size.join(' ');

  return size.reduce((acc, curr, index) => {
    if (index === size.length - 1) {
      return acc + `repeat(${elements - index}, ${curr})`;
    }
    return acc + `${curr} `;
  }, '');
};

export const BmbSkeleton = ({ type = 'header' }: BmbSkeletonProps) => {
  switch (type) {
    case 'stray':
      return (
        <div className="bmb_skeleton">
          <div
            className="bmb_skeleton-stray"
            style={grid(2, 2, 'm', 'm', ['4rem', '2fr'], 'auto')}
          >
            <section
              className="bmb_skeleton-circle bmb_skeleton-item"
              style={gridItem(1, 1, 1, 2)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(2, 1)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(2, 2)}
            />
          </div>
        </div>
      );
    case 'generic1':
      return (
        <div className="bmb_skeleton">
          <div
            className="bmb_skeleton-generic1"
            style={grid(1, 4, 'm', 'm')}
          >
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 1)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 2)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 3)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 4)}
            />
          </div>
        </div>
      );
    case 'generic2':
      return (
        <div className="bmb_skeleton">
          <div
            className="bmb_skeleton-generic2"
            style={grid(1, 3, 'xl', 'xl')}
          >
            <section className="bmb_skeleton-box" style={gridItem(1, 1)} />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 2)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 3)}
            />
          </div>
        </div>
      );
    case 'generic3':
      return (
        <div className="bmb_skeleton">
          <div
            className="bmb_skeleton-generic3"
            style={grid(1, 3, 'none', 'none')}
          >
            <section
              className="bmb_skeleton-box-header"
              style={gridItem(1, 1)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(1, 2)}
            />
          </div>
        </div>
      );
    case 'input':
      return (
        <div className="bmb_skeleton">
          <div className="bmb_skeleton-input">
            <section className="bmb_skeleton-headline bmb_skeleton-item" />
          </div>
        </div>
      );
    default:
      return (
        <div className="bmb_skeleton">
          <div
            className="bmb_skeleton-header"
            style={grid(3, 1, 'm', 'm', ['1.5rem', '2fr', '1.5rem'], 'auto')}
          >
            <section
              className="bmb_skeleton-circle bmb_skeleton-item"
              style={gridItem(1, 1)}
            />
            <section
              className="bmb_skeleton-headline bmb_skeleton-item"
              style={gridItem(2, 1)}
            />
            <section
              className="bmb_skeleton-circle bmb_skeleton-item"
              style={gridItem(3, 1)}
            />
          </div>
        </div>
      );
  }
};
