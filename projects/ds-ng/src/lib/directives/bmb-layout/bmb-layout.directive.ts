import { Directive, HostBinding, Input } from '@angular/core';
import { SizeNames } from '../../types';

export type IJustifyOptions =
  | 'center'
  | 'end'
  | 'start'
  | 'stretch'
  | 'spaceAround'
  | 'spaceBetween'
  | 'spaceEvenly';
export type IAlignItemsOptions = 'center' | 'end' | 'start' | 'stretch';

@Directive({
  selector: '[bmbLayout]',
  standalone: true,
})
export class BmbLayoutDirective {
  @Input() gapSize: SizeNames = 'm';
  @Input() margin: SizeNames = 'm';
  @Input() dynamicCols: boolean = false;
  @Input() justify: IJustifyOptions = 'start';
  @Input() alignItems: IAlignItemsOptions = 'start';

  constructor() {}

  @HostBinding('class') get elementClass(): string[] {
    const classes = [
      'bmb_layout',
      `bmb_gap-${this.gapSize}`,
      `bmb_margin-${this.margin}`,
      `bmb_justify-${this.justify}`,
      `bmb_alignItems-${this.alignItems}`,
    ];

    if (this.dynamicCols) classes.push('bmb_layout-smart');
    return classes;
  }
}
