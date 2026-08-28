import { Directive, effect, ElementRef, HostBinding, inject, input } from '@angular/core';
import { SizeNames } from '../../../_shared/types';
import {
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../../_shared/types/components/layout';

@Directive({
  selector: '[bmbVerticalLayout]',
  standalone: true,
})
export class BmbVerticalLayoutDirective {
  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('start');
  alignItems = input<IAlignItemsOptions>('start');
  layoutHeight = input<string>('auto');
  margin = input<SizeNames>('none');

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    effect(() => {
      this.el.nativeElement.style.height = this.layoutHeight();
    });
  }

  @HostBinding('class')
  get elementClass(): string[] {
    return [
      'bmb_vertical-layout',
      `bmb_gap-${this.gapSize()}`,
      `bmb_justify-${this.justify()}`,
      `bmb_align-items-${this.alignItems()}`,
      `bmb_margin-${this.margin()}`,
    ];
  }
}
