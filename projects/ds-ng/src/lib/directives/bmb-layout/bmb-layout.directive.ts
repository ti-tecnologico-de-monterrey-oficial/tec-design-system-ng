import { Directive, HostBinding, input } from '@angular/core';
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
  gapSize = input<SizeNames>('m');
  margin = input<SizeNames>('m');
  dynamicCols = input<boolean>(false);
  justify = input<IJustifyOptions>('start');
  alignItems = input<IAlignItemsOptions>('start');
  isQueryContainer = input<boolean>();

  @HostBinding('class') get elementClass(): string[] {
    const baseClassName: string = 'bmb_layout';
    const classes = [
      `bmb_gap-${this.gapSize()}`,
      `bmb_margin-${this.margin()}`,
      `bmb_justify-${this.justify()}`,
      `bmb_align-items-${this.alignItems()}`,
    ];

    if (this.dynamicCols()) classes.push(`${baseClassName}-smart`);
    if (this.isQueryContainer()) classes.push(`${baseClassName}-container`);
    else classes.push(baseClassName);

    return classes;
  }
}
