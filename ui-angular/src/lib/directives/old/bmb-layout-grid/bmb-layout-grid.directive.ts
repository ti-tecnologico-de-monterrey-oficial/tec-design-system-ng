import {
  getBmbLayoutGridElementClass,
  getBmbLayoutGridElementStyle,
  getBmbLayoutGridItemElementClass,
  getBmbLayoutGridItemElementStyle,
  generateGridArray,
  getGridRules,
} from '../../../_shared/logic/directives/bmb-layout-grid';
import { Directive, HostBinding, input } from '@angular/core';
import { SizeNames } from '../../../_shared/types';

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
    return getBmbLayoutGridElementClass({});
  }

  generateArray(size: string[], elements: number): string {
    return generateGridArray(size, elements);
  }

  getRules(size: string | string[], elements: number): string {
    return getGridRules(size, elements);
  }

  @HostBinding('style') get elementStyle(): string {
    return getBmbLayoutGridElementStyle({
      rowSize: this.rowSize(),
      rows: this.rows(),
      columnSize: this.columnSize(),
      columns: this.columns(),
      colGapSize: this.colGapSize(),
      rowGapSize: this.rowGapSize(),
      height: this.height(),
    });
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
    return getBmbLayoutGridItemElementClass({});
  }

  @HostBinding('style') get elementStyle(): string {
    return getBmbLayoutGridItemElementStyle({
      rowStart: this.rowStart(),
      colStart: this.colStart(),
      numberOfRows: this.numberOfRows(),
      numberOfColumns: this.numberOfColumns(),
    });
  }
}
