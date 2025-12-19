import { Directive, effect, HostBinding, input } from '@angular/core';
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
  layoutHeight = input<string>('100%');
  margin = input<SizeNames>('none');

  constructor() {
    effect(() => {
      this.styleHeight = this.layoutHeight();
    });
  }

  @HostBinding('class') get elementClass(): string[] {
    return [
      'bmb_vertical-layout',
      `bmb_gap-${this.gapSize()}`,
      `bmb_justify-${this.justify()}`,
      `bmb_align-items-${this.alignItems()}`,
      `bmb_margin-${this.margin()}`,
    ];
  }

  @HostBinding('style.height') styleHeight?: string;
}
