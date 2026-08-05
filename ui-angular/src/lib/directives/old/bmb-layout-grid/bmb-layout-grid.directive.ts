import { Directive, HostBinding, input } from '@angular/core';
import { SizeNames } from '../../types';

@Directive({
  selector: '[bmbLayoutGrid]',
  standalone: true,
})
export class BmbLayoutGridDirective {
  colGapSize = input<SizeNames>('m');
  rowGapSize = input<SizeNames>('m');
  columnSize = input<string[] | string>('auto');
  rowSize = input<string[] | string>('auto');
  columns = input<number>(1);
  rows = input<number>(1);
  height = input<string | number>('auto');

  constructor() {}

  @HostBinding('class') get elementClass(): string[] {
    return ['bmb_layout-grid'];
  }

  generateArray(size: string[], elements: number): string {
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

  getRules(size: string | string[], elements: number): string {
    if (typeof size === 'string') return `repeat(${elements}, ${size})`;
    return this.generateArray(size as string[], elements);
  }

  @HostBinding('style') get elementStyle(): string {
    const rowTemplate: string = this.getRules(this.rowSize(), this.rows());
    const colTemplate: string = this.getRules(
      this.columnSize(),
      this.columns(),
    );

    return `
      grid-template-columns: ${colTemplate};
      grid-template-rows: ${rowTemplate};
      gap: var(--bmb-gap-${this.colGapSize()}) var(--bmb-gap-${this.rowGapSize()});
      height: ${typeof this.height() === 'number' ? `${this.height()}px` : this.height()};
    `;
  }
}

@Directive({
  selector: '[bmbLayoutGridItem]',
  standalone: true,
})
export class BmbLayoutGridItemDirective {
  colStart = input.required<number>();
  rowStart = input.required<number>();
  numberOfColumns = input<number>(1);
  numberOfRows = input<number>(1);

  constructor() {}

  @HostBinding('class') get elementClass(): string[] {
    return ['bmb_layout-grid-item'];
  }

  @HostBinding('style') get elementStyle(): string {
    return `
      grid-area: ${this.rowStart()} / ${this.colStart()} / ${this.numberOfRows() + this.rowStart()} / ${this.numberOfColumns() + this.colStart()};
    `;
  }
}
