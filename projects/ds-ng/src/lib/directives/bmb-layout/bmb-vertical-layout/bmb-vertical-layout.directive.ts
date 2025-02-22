import { Directive, HostBinding, input } from '@angular/core';
import { SizeNames } from '../../../types';
import { IAlignItemsOptions, IJustifyOptions } from '../bmb-layout.directive';

@Directive({
  selector: '[bmbVerticalLayout]',
  standalone: true,
})
export class BmbVerticalLayoutDirective {
  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('start');
  alignItems = input<IAlignItemsOptions>('start');

  constructor() {}

  @HostBinding('class') get elementClass(): string[] {
    const classes = [
      'bmb_vertical-layout',
      `bmb_gap-${this.gapSize()}`,
      `bmb_justify-${this.justify()}`,
      `bmb_alignItems-${this.alignItems()}`,
    ];

    return classes;
  }
}
